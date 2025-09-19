# Medigram

Medigram, sağlık profesyonelleri ve tıp öğrencileri için güncel ve güvenilir tıbbi bilgileri kolayca takip edebilecekleri bir mobil platformdur. Uygulama, kullanıcıların kişiselleştirilmiş bir akışta içerik tüketmesine, yapay zekâ ile desteklenen klinik sorulara hızlı yanıtlar bulmasına ve uzmanlarla etkileşime geçmesine yardımcı olur.

## Hedef
- **Bilgiye erişimi hızlandırmak:** Kullanıcıların en güncel tıbbi rehberlere, vaka analizlerine ve araştırma özetlerine kaydırmalı bir akışla ulaşmalarını sağlamak.
- **Klinik karar süreçlerini desteklemek:** Yapay zekâ destekli soru-cevap motoru sayesinde karmaşık vakalara yönelik karar destek hizmeti sunmak.
- **Topluluk etkileşimini artırmak:** Uzman görüşleri, yorumlar ve paylaşılabilir içerikler ile profesyoneller arasındaki etkileşimi güçlendirmek.

## Temel Özellikler
- **Kaydırmalı tıbbi içerik akışı:** Kısa, görsel ağırlıklı kartlar aracılığıyla rehberler, vaka notları ve tedavi algoritmalarına hızlı göz atma.
- **Yapay zekâ destekli soru-cevap:** Klinik sorular için doğal dilde soru sorma, kanıta dayalı yanıt alma ve ek kaynak önerileri.
- **Kişiselleştirilmiş öneriler:** Kullanıcının ilgi alanlarına göre özelleştirilmiş içerik ve bildirimler.

## Teknoloji Yığını
- **Mobil uygulama:** React Native (Expo veya React Native CLI) ile çapraz platform geliştirme.
- **Arka uç & API:** Node.js tabanlı REST/GraphQL servisleri, gerçek zamanlı özellikler için Socket.IO.
- **Veri & Depolama:** PostgreSQL veya MongoDB, içerik dağıtımı için CDN entegrasyonu.
- **Yapay zekâ entegrasyonu:** Medikal metinler için ince ayarlanmış büyük dil modeli API'leri ve metin vektörleştirme servisleri.

## Geliştirme Ortamı Kurulumu
1. **Node.js kurun:** Resmî web sitesinden (>=18.x) indirip yükleyin veya `nvm` kullanarak kurulum yapın.
2. **Paket yöneticisini hazırlayın:** `npm` Node.js ile gelir; isteğe bağlı olarak `yarn` veya `pnpm` kurabilirsiniz.
3. **React Native araçları:**
   - Expo kullanacaksanız `npm install --global expo-cli` komutunu çalıştırın.
   - React Native CLI tercih ediyorsanız `npm install --global react-native-cli` ve platforma göre Android Studio/Xcode kurulumlarını tamamlayın.
4. **Mobil emülatör veya fiziksel cihaz hazırlığı:** Android Studio AVD veya Xcode Simulator yapılandırın; fiziksel cihazlar için USB hata ayıklamasını etkinleştirin.
5. **AI API anahtarı edinin:** Tercih edilen yapay zekâ sağlayıcısında (örn. OpenAI, Azure AI, Google Vertex) hesap oluşturun ve API anahtarınızı alın.
6. **Çevresel değişkenleri ayarlayın:** `.env` dosyasında `AI_API_KEY`, `API_BASE_URL` gibi gerekli anahtarları tanımlayın.
7. **Bağımlılıkları yükleyin:** Depoyu klonladıktan sonra kök dizinde `npm install` veya `yarn install` komutunu çalıştırın.
8. **Geliştirme sunucusunu başlatın:** Expo için `npx expo start`, React Native CLI için `npx react-native start` ve platforma göre `npx react-native run-ios` / `npx react-native run-android` komutlarını kullanın.

## Gelecek Yol Haritası
- **Planlanan ekranlar:**
  - Kullanıcı profil yönetimi, favori içerikler ve kişiselleştirme ayarları.
  - Topluluk forumu ve uzman danışma ekranları.
  - Klinik vaka simülasyonu ve interaktif eğitim modülleri.
- **İçerik yönetimi:**
  - Editör onay süreçleri, içerik sürümlendirme ve kaynak doğrulama araçları.
  - Kurumsal içerik sağlayıcıları için entegrasyon API'leri.
- **Güvenlik ve KVKK uyumluluğu:**
  - Veri şifreleme, erişim logları ve kimlik doğrulama mekanizmalarının güçlendirilmesi.
  - Kullanıcı verisi saklama politikalarının KVKK'ya uygun şekilde dokümante edilmesi ve denetlenmesi.

