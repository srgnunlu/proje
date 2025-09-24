import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { AiResponse, FeedItem } from '@models/feed';

interface ContentCardProps {
  item: FeedItem;
  onAsk: (item: FeedItem) => void;
  aiResponse?: AiResponse;
  isActive?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onAsk, aiResponse, isActive }) => {
  return (
    <View style={[styles.card, isActive && styles.cardActive]}>
      {item.image ? <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" /> : null}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
        <Text style={styles.body}>{item.body}</Text>
        {aiResponse ? (
          <View style={styles.responseContainer}>
            <Text style={styles.responseLabel}>Son Yanıt:</Text>
            <Text style={styles.question}>{aiResponse.question}</Text>
            <Text style={styles.answer}>{aiResponse.answer}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => onAsk(item)} style={styles.askButton} accessibilityRole="button">
          <Text style={styles.askButtonText}>Sor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    overflow: 'hidden'
  },
  cardActive: {
    transform: [{ scale: 1.02 }]
  },
  image: {
    width: '100%',
    height: 180
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2933'
  },
  summary: {
    fontSize: 16,
    color: '#52606d'
  },
  body: {
    fontSize: 15,
    color: '#334155'
  },
  responseContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    gap: 6
  },
  responseLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#0f172a'
  },
  question: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#475569'
  },
  answer: {
    fontSize: 14,
    color: '#0f172a'
  },
  footer: {
    padding: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e2e8f0'
  },
  askButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },
  askButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16
  }
});

export default ContentCard;
