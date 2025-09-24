import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import type { ListRenderItemInfo, ViewToken } from 'react-native';

import ContentCard from '@components/ContentCard';
import { askQuestion } from '@store/aiSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setCurrentIndex } from '@store/feedSlice';
import type { FeedItem } from '@models/feed';

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 60
};

const FeedScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [selectedCard, setSelectedCard] = useState<FeedItem | undefined>();
  const { width } = useWindowDimensions();

  const cards = useAppSelector(state => state.feed.cards);
  const currentIndex = useAppSelector(state => state.feed.currentIndex);
  const aiState = useAppSelector(state => state.ai);

  const responsesByCard = aiState.responses;

  const openQuestionModal = useCallback((card: FeedItem) => {
    setSelectedCard(card);
    setQuestion('');
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setQuestion('');
  }, []);

  const onSubmitQuestion = useCallback(() => {
    if (!selectedCard || !question.trim()) {
      return;
    }

    dispatch(
      askQuestion({
        card: selectedCard,
        question: question.trim()
      })
    );
  }, [dispatch, question, selectedCard]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken & { item: FeedItem }> }) => {
      const firstVisible = viewableItems[0];
      if (firstVisible?.index != null) {
        dispatch(setCurrentIndex(firstVisible.index));
      }
    }
  ).current;

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<FeedItem>) => {
      return (
        <View style={[styles.slide, { width }]}> 
          <ContentCard
            item={item}
            onAsk={openQuestionModal}
            aiResponse={responsesByCard[item.id]}
            isActive={currentIndex === index}
          />
        </View>
      );
    },
    [currentIndex, openQuestionModal, responsesByCard, width]
  );

  const modalContent = useMemo(() => {
    if (!selectedCard) {
      return null;
    }

    const aiResponse = responsesByCard[selectedCard.id];
    const isLoading = aiState.status === 'loading' && aiState.activeCardId === selectedCard.id;
    const disableSubmit = isLoading || question.trim().length === 0;

    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{selectedCard.title}</Text>
        <Text style={styles.modalSubtitle}>Sorunu yaz ve gönder.</Text>
        <TextInput
          multiline
          value={question}
          onChangeText={setQuestion}
          placeholder="Bu içerik hakkında ne merak ediyorsun?"
          style={styles.input}
          textAlignVertical="top"
        />
        {aiState.error ? <Text style={styles.error}>{aiState.error}</Text> : null}
        {isLoading ? <ActivityIndicator color="#2563eb" style={styles.loader} /> : null}
        {aiResponse && !isLoading ? (
          <View style={styles.answerContainer}>
            <Text style={styles.answerLabel}>Yanıt</Text>
            <Text style={styles.answerText}>{aiResponse.answer}</Text>
          </View>
        ) : null}
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={closeModal} style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonTextSecondary}>Kapat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmitQuestion}
            disabled={disableSubmit}
            style={[styles.button, styles.primaryButton, disableSubmit && styles.buttonDisabled]}
          >
            <Text style={[styles.buttonTextPrimary, disableSubmit && styles.buttonTextDisabled]}>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [aiState.activeCardId, aiState.error, aiState.status, closeModal, onSubmitQuestion, question, responsesByCard, selectedCard]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.listContent}
      />
      <Modal visible={modalVisible} animationType="slide" onRequestClose={closeModal} transparent>
        <View style={styles.modalOverlay}>
          {modalContent}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContent: {
    alignItems: 'stretch'
  },
  slide: {
    flex: 1
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    gap: 16
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a'
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#475569'
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 16,
    padding: 12,
    fontSize: 16,
    color: '#0f172a'
  },
  loader: {
    marginTop: 8
  },
  error: {
    color: '#dc2626',
    fontSize: 13
  },
  answerContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 16,
    gap: 8
  },
  answerLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#1d4ed8'
  },
  answerText: {
    fontSize: 15,
    color: '#0f172a'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  primaryButton: {
    backgroundColor: '#2563eb'
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8'
  },
  buttonTextPrimary: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  },
  buttonTextDisabled: {
    color: 'rgba(255,255,255,0.7)'
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0'
  },
  buttonTextSecondary: {
    color: '#0f172a',
    fontWeight: '600',
    fontSize: 16
  }
});

export default FeedScreen;
