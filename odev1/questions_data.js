// 4. Bölüm Sokratik Pekiştirme & Mobil Öğrenme Veri Seti (40 Soru)
// Hiçbir sokratik aşamada doğrudan cevap verilmez; öğrenciye düşünme soruları yöneltilir.
window.SOCRATIC_QUESTIONS = [
  {
    "id": "q-1",
    "globalIndex": 1,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 1,
    "text": "$$3^7 + 3^7 + 3^7$$\\n\\nişleminin sonucu aşağıdakilerden hangisidir?",
    "options": [
      "A) $3^8$",
      "B) $3^{21}$",
      "C) $9^7$",
      "D) $9^{21}$",
      "E) $27^7$"
    ],
    "correctAnswer": "A",
    "trap": "Öğrenci üsleri toplayarak $3^{21}$ (B) veya tabanları toplayarak $9^7$ (C) bulma eğilimindedir. Doğrusu: 3 tane $3^7$ toplanırsa $3 \\cdot 3^7 = 3^{7+1} = 3^8$ olur.",
    "hint": "3 tane aynı terim toplanıyor: $x + x + x = 3x$.",
    "socraticPrompts": [
      "İfadeye dikkatlice bak: Kaç tane $3^7$ toplanıyor? Eğer elinde 3 tane elma olsaydı bunu toplama yerine çarpma olarak nasıl yazardın?",
      "Çok güzel. $3 \\cdot 3^7$ yazdığında, en baştaki 3 sayısının üzerinde gizli bir kuvvet var mıdır? Bu kuvvet kaçtır?",
      "Tabanları aynı olan iki üslü ifade birbiriyle çarpılırken taban ve üslerle ilgili temel kuralımız neydi? Şimdi bu kuralı $3^1 \\cdot 3^7$ ifadesine uygula."
    ],
    "distractors": {
      "B": "Üsleri toplamayı denedin ($7+7+7=21$). Ancak dikkat et: Üslerin toplanması için arada TOPLAMA mı olmalıydı yoksa ÇARPMA mı? Çarpma ile tekrarlı toplama arasındaki farkı düşün.",
      "C": "Tabanları toplamayı denedin ($3+3+3=9$). Ancak $x+x+x = 3x$ midir yoksa $3x$ yerine taban mı değişir? Katsayı nereye yazılır?",
      "D": "Hem tabanları hem üsleri toplamayı denedin. Matematikte böyle bir kural var mı? Tekrarlı toplamayı çarpım biçiminde yazmayı dene.",
      "E": "Tabanları çarpmayı denedin. Oysa aradaki işaret toplama. Kaç adet $3^7$ olduğunu katsayı olarak yazabilir misin?"
    }
  },
  {
    "id": "q-2",
    "globalIndex": 2,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 2,
    "text": "4 tane $4^4$ sayısının **toplamının**, 4 tane $4^4$ sayısının **çarpımına** oranı kaçtır?",
    "options": [
      "A) $4^{-16}$",
      "B) $4^{-11}$",
      "C) $4^{-8}$",
      "D) $4^{0}$",
      "E) $4^{11}$"
    ],
    "correctAnswer": "B",
    "trap": "Toplama ile çarpmayı karıştırıp pay ile paydayı eşit zannederek 1 (D) işaretleme hatası. Toplam = $4 \\cdot 4^4 = 4^5$, Çarpım = $(4^4)^4 = 4^{16}$. Oran: $4^5 / 4^{16} = 4^{-11}$.",
    "hint": "Toplam = $4 \\cdot 4^4$, Çarpım = $4^4 \\cdot 4^4 \\cdot 4^4 \\cdot 4^4$.",
    "socraticPrompts": [
      "İlk olarak payı ele alalım: '4 tane $4^4$'ün toplamı' dendiğinde bunu $4 \\cdot 4^4$ olarak yazabilir misin? Bunun üslü eşiti nedir?",
      "Şimdi paydaya bakalım: '4 tane $4^4$'ün çarpımı' nedir? Yani $4^4 \\cdot 4^4 \\cdot 4^4 \\cdot 4^4$. Tabanlar aynıyken üsleri ne yaparız?",
      "Harika! Şimdi elinde pay ve payda var. Bölme işleminde payın üssünden paydanın üssünü çıkarırsan ne elde edersin?"
    ],
    "distractors": {
      "A": "Çarpımı hesaplarken üsleri çarpmış olabilir misin? $4^4 \\cdot 4^4 \\cdot 4^4 \\cdot 4^4$ işleminde tabanlar aynıyken üsler toplanır mı çarpılır mı?",
      "D": "Sonucu 1 buldun; yani toplam ile çarpımın eşit olduğunu varsaydın. 4 ile toplamak ile 4 defa kendisiyle çarpmak aynı şey midir?",
      "E": "Pay ile paydanın yerini karıştırmış veya üsleri ters çıkarmış olabilir misin? Payın kuvveti paydadan küçük olduğuna göre üs pozitif mi negatif mi çıkmalı?"
    }
  },
  {
    "id": "q-3",
    "globalIndex": 3,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 3,
    "text": "$$(-2)^4 + (-2^4) + (-2)^3$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) -16",
      "B) -8",
      "C) 0",
      "D) 8",
      "E) 24"
    ],
    "correctAnswer": "B",
    "trap": "$(-2)^4 = +16$ ile $(-2^4) = -16$ farkını göremeyip her ikisini pozitif veya negatif almak. Toplam: $16 + (-16) + (-8) = -8$.",
    "hint": "Parantez dışındaki çift kuvvet tabanın işaretini artı yapar, parantezsiz eksi kuvvete dahil değildir.",
    "socraticPrompts": [
      "Parantezin konumuna odaklanalım: $(-2)^4$ ifadesinde 4. kuvvet eksiyi de kapsar mı? Çift kuvvet negatif sayıyı neye çevirir?",
      "Peki $(-2^4)$ ifadesine bak: Burada 4. kuvvet eksi işaretinin üzerinde mi, yoksa sadece 2'nin üzerinde mi?",
      "Son olarak $(-2)^3$ ifadesi: Tek kuvvet negatif sayının işaretini nasıl etkiler? Şimdi bulduğun bu üç değeri işaretleriyle yan yana topla."
    ],
    "distractors": {
      "A": "Tüm terimleri negatif kabul etmiş olabilir misin? Parantez dışındaki çift kuvvet tabanı pozitif yapmaz mıydı?",
      "C": "İlk iki terimin birbirini götürdüğünü doğru gördün ($16 - 16 = 0$). Peki üçüncü terim olan $(-2)^3$ nereye gitti?",
      "D": "Sonucun pozitif olduğunu düşündün. Ancak en son terim $(-2)^3 = -8$ değil midir?"
    }
  },
  {
    "id": "q-4",
    "globalIndex": 4,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 4,
    "text": "$$7 \\cdot 5^8 - 3 \\cdot 5^8 + 5^8$$\\n\\nişleminin sonucu aşağıdakilerden hangisidir?",
    "options": [
      "A) $5^8$",
      "B) $5^9$",
      "C) $4 \\cdot 5^8$",
      "D) $5^{10}$",
      "E) $25^8$"
    ],
    "correctAnswer": "B",
    "trap": "En sondaki $+5^8$ teriminin katsayısının $+1$ olduğunu unutarak $7 - 3 = 4 \\cdot 5^8$ (C) bulmak. Doğrusu: $(7 - 3 + 1) \\cdot 5^8 = 5 \\cdot 5^8 = 5^9$.",
    "hint": "Ortak $5^8$ parantezinde katsayıları topla: $(7 - 3 + 1)$.",
    "socraticPrompts": [
      "Verilen ifadedeki tüm terimlerde ortak olan üslü parça hangisidir?",
      "İfadeyi ortak $5^8$ parantezine aldığında katsayılar sırasıyla ne olur? Özellikle en sondaki $+5^8$ teriminin önünde görünmeyen hangi katsayı vardır?",
      "Parantez içindeki $(7 - 3 + 1)$ işleminin sonucu kaçtır? Çıkan sayıyı $5^8$ ile çarptığında yeni üs ne olur?"
    ],
    "distractors": {
      "A": "Katsayıların birbirini sıfırladığını veya 1 kaldığını düşündün. Parantez içindeki $(7 - 3 + 1)$ toplamını tekrar kontrol et.",
      "C": "En sondaki $+5^8$'in katsayısını 1 saymayı unuttun ($7 - 3 = 4$). Eğer katsayı 0 olsaydı o terim hiç yazılmazdı!",
      "E": "Taban ile katsayıyı çarpmaya kalktın. $5 \\cdot 5^8$ işleminde tabanlar aynıyken katsayı tabana katılmaz, üs bir artar!"
    }
  },
  {
    "id": "q-5",
    "globalIndex": 5,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 5,
    "text": "$$2^5 + 2^5 + 2^6 + 2^7$$\\n\\nişleminin sonucu aşağıdakilerden hangisine eşittir?",
    "options": [
      "A) $2^7$",
      "B) $2^8$",
      "C) $2^9$",
      "D) $2^{10}$",
      "E) $2^{24}$"
    ],
    "correctAnswer": "B",
    "trap": "Tüm üsleri toplayarak $2^{24}$ (E) demek. Domino toplamı: $2^5 + 2^5 = 2^6$, ardından $2^6 + 2^6 = 2^7$, son olarak $2^7 + 2^7 = 2^8$.",
    "hint": "İlk iki terimi toplayarak başla: $2^5 + 2^5 = 2 \\cdot 2^5 = 2^6$.",
    "socraticPrompts": [
      "İşlemi bir kerede çözmek yerine soldan sağa ikişer ikişer gruplayalım: İlk iki terim $2^5 + 2^5$ neye eşittir?",
      "Harika, $2 \\cdot 2^5 = 2^6$ buldun. Şimdi bu sonucu yanındaki üçüncü terimle topla: $2^6 + 2^6$ ne eder?",
      "Tıpkı devrilen domino taşları gibi! Elindeki yeni sonucu son terim olan $2^7$ ile toplarsan nihai sonuç ne olur?"
    ],
    "distractors": {
      "A": "Sadece ilk adımı hesaplamış olabilir misin? Son terim $2^7$ idi, sonuç ondan daha büyük olmalı.",
      "E": "Tüm üsleri toplamayı denedin ($5+5+6+7=23$ veya $24$). Arada çarpma değil toplama var; domino mantığını kullan."
    }
  },
  {
    "id": "q-6",
    "globalIndex": 6,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 6,
    "text": "$$2^{-3} + 2^{-3} + 2^{-3} + 2^{-3}$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) $2^{-12}$",
      "B) $2^{-5}$",
      "C) $2^{-1}$",
      "D) 1",
      "E) 2"
    ],
    "correctAnswer": "C",
    "trap": "Negatif üslerde de üsleri toplama yanılgısına düşüp $2^{-12}$ (A) bulmak. 4 tane $2^{-3} = 4 \\cdot 2^{-3} = 2^2 \\cdot 2^{-3} = 2^{2-3} = 2^{-1} = 1/2$.",
    "hint": "4 tane $2^{-3}$ toplanıyor: $4 \\cdot 2^{-3}$ yazıp 4'ü $2^2$ yap.",
    "socraticPrompts": [
      "Burada kaç tane $2^{-3}$ toplanıyor? Bunu adet $\\times$ terim biçiminde yazabilir misin?",
      "Çok güzel: $4 \\cdot 2^{-3}$. Peki 4 sayısını 2 tabanında bir üslü sayı olarak nasıl yazarsın?",
      "Şimdi $2^2 \\cdot 2^{-3}$ çarpımını yap. Tabanlar aynıyken üsler toplanır: $2 + (-3)$ kaç eder?"
    ],
    "distractors": {
      "A": "Üsleri toplamayı denedin ($-3 - 3 - 3 - 3 = -12$). Tekrarlı toplama yaparken üsler toplanmaz, adet ile çarpılır!",
      "B": "Negatif kuvvet ile toplamada bir işlem hatası yaptın. $2^2$ ile $2^{-3}$ çarpılırken üsler $2 + (-3)$ olur."
    }
  },
  {
    "id": "q-7",
    "globalIndex": 7,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 7,
    "text": "$$\\frac{6^5 + 6^5 + 6^5 + 6^5 + 6^5 + 6^5}{3^6 + 3^6}$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) 16",
      "B) 32",
      "C) 64",
      "D) 108",
      "E) 216"
    ],
    "correctAnswer": "B",
    "trap": "Paydaki 6'ları taban toplayıp $36^5$ sanmak. Pay: $6 \\cdot 6^5 = 6^6 = 2^6 \\cdot 3^6$. Payda: $2 \\cdot 3^6$. Kesir: $2^6 \\cdot 3^6 / (2 \\cdot 3^6) = 2^5 = 32$.",
    "hint": "Payda 6 tane $6^5$, paydada 2 tane $3^6$ var.",
    "socraticPrompts": [
      "Pay kısmında kaç tane $6^5$ toplanıyor? Bunu bir çarpım olarak ifade et.",
      "Payda kısmında kaç tane $3^6$ toplanıyor? Bunu da bir çarpım olarak yaz.",
      "$6 \\cdot 6^5 = 6^6$ olur. $6^6$'yı $(2 \\cdot 3)^6 = 2^6 \\cdot 3^6$ olarak açıp paydadaki $2 \\cdot 3^6$ ile sadeleştirebilir misin?"
    ],
    "distractors": {
      "A": "Paydaki katsayı sadeleştirmesinde bir 2 çarpanı eksik kalmış olabilir mi? $2^6 / 2 = 2^5 = 32$.",
      "C": "Paydadaki 2 bölenini unuttun ($2^6 = 64$). Paydada $3^6 + 3^6 = 2 \\cdot 3^6$ olduğunu hatırla."
    }
  },
  {
    "id": "q-8",
    "globalIndex": 8,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 8,
    "text": "$$3^x + 3^x + 3^x = 81$$\\n\\nolduğuna göre $x$ gerçek sayısı kaçtır?",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 4",
      "E) 5"
    ],
    "correctAnswer": "C",
    "trap": "3 tane $3^x$'i toplayınca $3^{3x} = 81$ deyip $3x=4$ aramak. Doğrusu: $3 \\cdot 3^x = 3^{x+1} = 3^4 \\implies x+1=4 \\implies x=3$.",
    "hint": "Sol taraf $3 \\cdot 3^x = 3^{x+1}$ olur.",
    "socraticPrompts": [
      "Sol tarafta kaç tane $3^x$ toplanıyor? Bunu çarpım olarak yazabilir misin?",
      "$3 \\cdot 3^x = 3^{x+1}$ olur. Peki sağ taraftaki 81 sayısını 3'ün bir kuvveti olarak yazarsan ne olur?",
      "$3^{x+1} = 3^4$ denkleminde tabanlar eşit olduğuna göre üsler de eşit olmalıdır. $x+1 = 4$ ise $x$ kaçtır?"
    ],
    "distractors": {
      "A": "3'ün kuvvetini yanlış eşitledin. $3^1 = 3$ eder, oysa sağ taraf 81.",
      "B": "81 sayısını $3^4$ yerine $3^3 = 27$ olarak almış olabilir misin?",
      "D": "$x+1 = 4$ denkleminde $+1$'i karşıya geçirmeyi unutup doğrudan 4 dedin!"
    }
  },
  {
    "id": "q-9",
    "globalIndex": 9,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 9,
    "text": "Bir kenar uzunluğu $2^4\\text{ cm}$ olan 8 adet özdeş kare karton, kenarları çakışacak biçimde yan yana dizilerek bir dikdörtgen oluşturuluyor.\\n\\n**Buna göre elde edilen bu dikdörtgenin alanı kaç $\\text{cm}^2$'dir?**",
    "options": [
      "A) $2^9$",
      "B) $2^{10}$",
      "C) $2^{11}$",
      "D) $2^{12}$",
      "E) $2^{14}$"
    ],
    "correctAnswer": "C",
    "trap": "Karenin alanı yerine çevresini hesaplamak veya 8'i üs olarak eklemek. 1 karenin alanı: $(2^4)^2 = 2^8$. Toplam alan: $8 \\cdot 2^8 = 2^3 \\cdot 2^8 = 2^{11}$.",
    "hint": "1 karenin alanı $a^2 = (2^4)^2$. Toplam alan 8 katıdır.",
    "socraticPrompts": [
      "Bir kenarı $2^4$ olan tek bir karenin alanı nasıl hesaplanır? ($a^2$ formülünü hatırla)",
      "$(2^4)^2$ üssün üssü kuralına göre $2^8$ eder. Bu karelerden kaç tanesi yan yana konuluyor?",
      "8 tane $2^8$ alanını toplamak veya $8 \\cdot 2^8$ çarpmak: 8 sayısını $2^3$ olarak yazıp üsleri toplayabilir misin?"
    ],
    "distractors": {
      "A": "Alanı hesaplamak yerine karenin bir kenarını 8 ile çarpmış olabilir misin? Alan $a^2$ ile başlar.",
      "B": "8 karesini $2^3$ yerine $2^2$ olarak almış olabilir misin? $2^3 \\cdot 2^8 = 2^{11}$ eder."
    }
  },
  {
    "id": "q-10",
    "globalIndex": 10,
    "testId": "quiz-1",
    "testNo": "01",
    "testTitle": "Üslü Sayılarda Toplama & Çıkarma: Temel Düzey ve Kritik Hata Tuzakları",
    "testBadge": "TEMEL DÜZEY • HATA TUZAKLARI & KAVRAM YANILGILARI",
    "questionNo": 10,
    "text": "Bir matematik öğretmeni tahtaya şu üç önermeyi yazmıştır:\\n\\nI. $2^a + 2^a = 2^{a+1}$\\nII. $3^a + 3^a + 3^a = 9^a$\\nIII. $5 \\cdot 2^a - 2^a = 2^{a+2}$\\n\\n**Buna göre bu önermelerden hangileri her $a$ gerçek sayısı için daima doğrudur?**",
    "options": [
      "A) Yalnız I",
      "B) Yalnız II",
      "C) I ve II",
      "D) I ve III",
      "E) I, II ve III"
    ],
    "correctAnswer": "D",
    "trap": "II. önermede tabanların toplanıp $9^a$ olacağını sanmak ($3 \\cdot 3^a = 3^{a+1} \\neq 9^a$). III'te ise $5 - 1 = 4 = 2^2$, böylece $2^2 \\cdot 2^a = 2^{a+2}$ doğrudur.",
    "hint": "Her önermeyi ortak çarpan parantezine alarak test et.",
    "socraticPrompts": [
      "I. önerme: $2^a + 2^a = 2 \\cdot 2^a = 2^{a+1}$. Bu doğru mu?",
      "II. önerme: $3^a + 3^a + 3^a = 3 \\cdot 3^a = 3^{a+1}$. Peki $3^{a+1}$ ifadesi her zaman $9^a$ sayısına eşit midir? (Örneğin $a=1$ verip dene)",
      "III. önerme: $5 \\cdot 2^a - 1 \\cdot 2^a = (5-1) \\cdot 2^a = 4 \\cdot 2^a$. 4 yerine $2^2$ yazarsan ne elde edersin?"
    ],
    "distractors": {
      "C": "II. önermeyi doğru kabul ettin. $a=1$ için sol taraf $3+3+3=9$, sağ taraf $9^1=9$. Ancak $a=2$ için sol taraf $9+9+9=27$, sağ taraf $9^2=81$! Her $a$ için doğru mudur?",
      "E": "Tüm önermelerin doğru olduğunu düşündün. Tabanların toplanması ($3+3+3=9$) kural dışıdır."
    }
  },
  {
    "id": "q-11",
    "globalIndex": 11,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 1,
    "text": "$$\\frac{2^{10} + 2^{12} + 2^{14}}{1 + 2^2 + 2^4}$$\\n\\nişleminin sonucu aşağıdakilerden hangisidir?",
    "options": [
      "A) $2^8$",
      "B) $2^9$",
      "C) $2^{10}$",
      "D) $2^{11}$",
      "E) $2^{12}$"
    ],
    "correctAnswer": "C",
    "trap": "Pay ve paydayı tek tek hesaplayıp bölmeye çalışarak vakit kaybetmek. Payı $2^{10}$ parantezine alırsak: $2^{10}(1 + 2^2 + 2^4) / (1 + 2^2 + 2^4) = 2^{10}$.",
    "hint": "Paydaki en küçük kuvvet olan $2^{10}$ parantezine al.",
    "socraticPrompts": [
      "Pay kısmındaki üslere bak: $2^{10}, 2^{12}, 2^{14}$. Bunların en küçüğü hangisidir?",
      "Payı $2^{10}$ parantezine aldığında içeride ne kalır? $2^{10}(1 + 2^? + 2^?)$",
      "Parantez içindeki ifade ile paydadaki ifadenin birebir aynı olduğunu fark ettin mi? Sadeleşince geriye ne kalır?"
    ],
    "distractors": {
      "A": "Paranteze alırken üsleri yanlış çıkardın. $14 - 10 = 4$ ve $12 - 10 = 2$ olur.",
      "D": "Pay ve paydayı sadeleştirirken bir adımda işlem hatası yaptın. Kalan terim doğrudan ortak parantez katsayısıdır."
    }
  },
  {
    "id": "q-12",
    "globalIndex": 12,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 2,
    "text": "$$\\frac{5 \\cdot 2^8}{3 \\cdot 4^4 - 16^2}$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) 1",
      "B) 2",
      "C) $\\dfrac{5}{2}$",
      "D) 4",
      "E) 5"
    ],
    "correctAnswer": "C",
    "trap": "Tabanları 2'ye dönüştürmeden işlem yapmaya kalkışmak. Payda: $4^4 = (2^2)^4 = 2^8$, $16^2 = (2^4)^2 = 2^8$. Payda = $3 \\cdot 2^8 - 2^8 = 2 \\cdot 2^8 = 2^9$. Kesir: $5 \\cdot 2^8 / 2^9 = 5/2$.",
    "hint": "$4^4$ ve $16^2$ ifadelerini 2 tabanında yaz.",
    "socraticPrompts": [
      "Paydada 4 ve 16 tabanları var. Bunların hepsini 2'nin kuvveti olarak yazabilir misin? $4^4 = (2^2)^4 = ?$ ve $16^2 = (2^4)^2 = ?$",
      "Payda şöyle oldu: $3 \\cdot 2^8 - 2^8$. Ortak $2^8$ parantezine alırsan katsayılar $(3-1)$ ne yapar?",
      "Payda $2 \\cdot 2^8 = 2^9$ oldu. Şimdi paydaki $5 \\cdot 2^8$ ile paydadaki $2^9$'u sadeleştir."
    ],
    "distractors": {
      "B": "Paydaki 5 katsayısını göz ardı etmiş olabilir misin? Sonuç tam sayı değil rasyonel bir sayıdır.",
      "E": "Paydadaki $2^9$'u $2^8$ ile sadeleştirirken 2 bölenini unuttun."
    }
  },
  {
    "id": "q-13",
    "globalIndex": 13,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 3,
    "text": "$$5^{10} - 5^9 + 5^8 = A \\cdot 5^8$$\\n\\neşitliğini sağlayan $A$ doğal sayısı kaçtır?",
    "options": [
      "A) 15",
      "B) 19",
      "C) 20",
      "D) 21",
      "E) 25"
    ],
    "correctAnswer": "D",
    "trap": "Parantez içine alırken son terimden kalan $+1$'i unutarak $25 - 5 = 20$ (C) bulmak. $5^8(5^2 - 5 + 1) = 5^8(25 - 5 + 1) = 21 \\cdot 5^8 \\implies A=21$.",
    "hint": "$5^8$ parantezine aldığında terimlerin yerinde $5^2 - 5^1 + 1$ kalır.",
    "socraticPrompts": [
      "Sol tarafta en küçük üs $5^8$'dir. İfadeyi $5^8$ parantezine alalım: $5^8(5^? - 5^? + ?)$",
      "$5^{10}$ teriminden $5^2 = 25$, $5^9$ teriminden $5^1 = 5$, peki $5^8$ teriminden ne kalır?",
      "Kendisine bölündüğünde kalan $+1$'i unutma: $25 - 5 + 1$ kaç eder?"
    ],
    "distractors": {
      "C": "En sondaki $5^8$ teriminden kalan $+1$'i unuttun ($25 - 5 = 20$). Ortak paranteze aldığında terim sayısı değişmez!",
      "E": "Katsayıları toplamak yerine doğrudan $5^2 = 25$ aldın."
    }
  },
  {
    "id": "q-14",
    "globalIndex": 14,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 4,
    "text": "$$\\frac{10^6 - 10^5}{9 \\cdot 10^4}$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) 1",
      "B) 10",
      "C) 90",
      "D) 100",
      "E) 900"
    ],
    "correctAnswer": "B",
    "trap": "Paydaki $10^6 - 10^5$ ifadesini $10^1$ sanmak. Pay: $10^5(10 - 1) = 9 \\cdot 10^5$. Kesir: $9 \\cdot 10^5 / (9 \\cdot 10^4) = 10^1 = 10$.",
    "hint": "Payı $10^5$ parantezine al: $10^5(10 - 1)$.",
    "socraticPrompts": [
      "Paydaki $10^6 - 10^5$ ifadesinde küçük olan $10^5$ parantezine alırsan içeride ne kalır? $10^5(10 - 1)$",
      "$10 - 1 = 9$ olduğuna göre pay $9 \\cdot 10^5$ oldu. Paydada ne vardı?",
      "Payda $9 \\cdot 10^4$ idi. 9'lar sadeleşirse $10^5 / 10^4$ kaça eşittir?"
    ],
    "distractors": {
      "A": "Bölme işleminde üsleri çıkarırken $10^{5-4} = 10^1 = 10$ yerine 1 buldun.",
      "C": "9 katsayısını sadeleştirmeden sonuca dahil etmiş olabilir misin?"
    }
  },
  {
    "id": "q-15",
    "globalIndex": 15,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 5,
    "text": "$$\\frac{12^4 - 6^4}{6^4}$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) 1",
      "B) 7",
      "C) 15",
      "D) 16",
      "E) 31"
    ],
    "correctAnswer": "C",
    "trap": "Payı $(12-6)^4 = 6^4$ sanıp sonucu $6^4/6^4 = 1$ bulmak. $12^4 = (2 \\cdot 6)^4 = 2^4 \\cdot 6^4$. Kesir: $6^4(2^4 - 1) / 6^4 = 2^4 - 1 = 16 - 1 = 15$.",
    "hint": "$12^4 = 2^4 \\cdot 6^4$ biçiminde çarpanlarına ayır.",
    "socraticPrompts": [
      "12 sayısını $2 \\cdot 6$ olarak yazabilirsin. O halde $12^4$ ifadesi $2^4 \\cdot 6^4$ olur mu?",
      "Şimdi payı $6^4$ parantezine al: $6^4(2^4 - 1)$.",
      "Paydadaki $6^4$ ile sadeleşince geriye sadece $2^4 - 1$ kalır. $2^4$ kaçtır ve 1 çıkarırsan ne kalır?"
    ],
    "distractors": {
      "A": "Paydaki çıkarmayı $(12-6)^4 = 6^4$ olarak yaptın! Üslü sayılarda tabanlar birbirinden çıkarılamaz!",
      "D": "$2^4 = 16$ bulup 1 çıkarmayı unuttun."
    }
  },
  {
    "id": "q-16",
    "globalIndex": 16,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 6,
    "text": "$$3^{x+2} - 3^{x+1} + 3^x = 63$$\\n\\neşitliğini sağlayan $x$ değeri kaçtır?",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 4",
      "E) 5"
    ],
    "correctAnswer": "B",
    "trap": "Katsayıları toplarken $3^2 - 3 + 1 = 7$ yerine işlem hatası yapmak. $3^x(9 - 3 + 1) = 7 \\cdot 3^x = 63 \\implies 3^x = 9 \\implies x = 2$.",
    "hint": "Sol tarafı en küçük üs olan $3^x$ parantezine al.",
    "socraticPrompts": [
      "Sol taraftaki en küçük kuvvet $3^x$'tir. $3^x$ parantezine aldığında: $3^x(3^2 - 3^1 + 1)$",
      "Parantez içindeki sayıları hesapla: $9 - 3 + 1$ kaç eder?",
      "$7 \\cdot 3^x = 63$ denkleminde her iki tarafı 7'ye bölersen $3^x$ kaça eşit olur? Buradan $x$ kaçtır?"
    ],
    "distractors": {
      "A": "$3^x = 9$ bulup $x=1$ dedin. 3'ün hangi kuvveti 9'dur?",
      "C": "63'ü 7'ye bölerken işlem hatası yapmış olabilir misin?"
    }
  },
  {
    "id": "q-17",
    "globalIndex": 17,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 7,
    "text": "$x = 2^n$ olduğuna göre,\\n\\n$$2^{n+3} - 2^{n+1} + 2^n$$\\n\\nifadesinin $x$ türünden eşiti aşağıdakilerden hangisidir?",
    "options": [
      "A) $5x$",
      "B) $6x$",
      "C) $7x$",
      "D) $8x$",
      "E) $9x$"
    ],
    "correctAnswer": "C",
    "trap": "$2^{n+3} = 2^n \\cdot 8$ olduğunu unutarak üsleri $x$ ile toplamak. $2^n(2^3 - 2^1 + 1) = x(8 - 2 + 1) = 7x$.",
    "hint": "$2^{n+3} = 8 \\cdot 2^n$ ve $2^{n+1} = 2 \\cdot 2^n$ yaz.",
    "socraticPrompts": [
      "$2^{n+3} = 2^n \\cdot 2^3 = 8 \\cdot 2^n$ biçiminde yazılabilir mi?",
      "Benzer şekilde $2^{n+1} = 2 \\cdot 2^n$ olur. Şimdi tüm ifadeyi $2^n$ parantezine al.",
      "$2^n(8 - 2 + 1) = 7 \\cdot 2^n$. Soru bize $2^n = x$ demişti, o halde cevap nedir?"
    ],
    "distractors": {
      "A": "Parantez içi katsayıları $8 - 2 - 1 = 5$ olarak çıkardın. İşaretin $+2^n$ olduğuna dikkat et.",
      "B": "En sondaki $+2^n$ teriminin $+1$ katsayısını unuttun ($8 - 2 = 6$)."
    }
  },
  {
    "id": "q-18",
    "globalIndex": 18,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 8,
    "text": "$$\\frac{2^9 + 2^8}{2^7 - 2^6}$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) 6",
      "B) 8",
      "C) 12",
      "D) 16",
      "E) 24"
    ],
    "correctAnswer": "C",
    "trap": "Pay ile paydayı direkt bölüp üsleri birbirinden çıkarmaya kalkışmak. Pay: $2^8(2 + 1) = 3 \\cdot 2^8$. Payda: $2^6(2 - 1) = 1 \\cdot 2^6$. Kesir: $3 \\cdot 2^{8-6} = 3 \\cdot 4 = 12$.",
    "hint": "Payı $2^8$, paydayı $2^6$ ortak parantezine al.",
    "socraticPrompts": [
      "Payı $2^8$ ortak parantezine alırsan içeride $(2 + 1)$ kalır. Pay kaça eşittir?",
      "Paydayı $2^6$ ortak parantezine alırsan içeride $(2 - 1)$ kalır. Payda kaça eşittir?",
      "Pay $3 \\cdot 2^8$, payda ise $1 \\cdot 2^6$ oldu. Üsleri çıkarırsan $3 \\cdot 2^{8-6} = 3 \\cdot 2^2$ kaç eder?"
    ],
    "distractors": {
      "A": "$3 \\cdot 4 = 12$ yerine $3 \\cdot 2 = 6$ hesaplamış olabilir misin?",
      "B": "Paydaki 3 katsayısını unutarak sadece $2^2 = 4$ veya 8 buldun."
    }
  },
  {
    "id": "q-19",
    "globalIndex": 19,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 9,
    "text": "$$2^{12} - (2^{11} + 2^{10} + 2^9 + 2^8)$$\\n\\nişleminin sonucu kaçtır?",
    "options": [
      "A) $2^7$",
      "B) $2^8$",
      "C) $2^9$",
      "D) $2^{10}$",
      "E) 0"
    ],
    "correctAnswer": "B",
    "trap": "Parantez içi toplamı $2^{12}$ sanarak sonucun 0 (E) olduğunu düşünmek. $2^{12} - 2^{11} = 2^{11}$, $2^{11} - 2^{10} = 2^{10}$, $2^{10} - 2^9 = 2^9$, $2^9 - 2^8 = 2^8$.",
    "hint": "Parantezi açarak sırayla çıkarma yap: $2^{12} - 2^{11} = 2^{11}$.",
    "socraticPrompts": [
      "Parantez içindeki terimleri adım adım soldan sağa açalım: $2^{12} - 2^{11} = ?$",
      "$2^{12} = 2 \\cdot 2^{11}$ olduğuna göre $2 \\cdot 2^{11} - 2^{11} = 2^{11}$ kalır.",
      "Şimdi sıradaki terimi çıkar: $2^{11} - 2^{10} = 2^{10}$. Bu şekilde sonuna kadar gidersen en son ne kalır?"
    ],
    "distractors": {
      "E": "Tüm toplamın $2^{12}$'ye eşit olduğunu varsayıp sonucun 0 olduğunu düşündün. Oysa her adımda geriye bir parça kalır!"
    }
  },
  {
    "id": "q-20",
    "globalIndex": 20,
    "testId": "quiz-2",
    "testNo": "02",
    "testTitle": "Ortak Çarpan Parantezi ve Taban Dönüşümleri: İşlem Becerisi",
    "testBadge": "KOLAY - ORTA DÜZEY • ORTAK PARANTEZ & SADELİK",
    "questionNo": 10,
    "text": "$$4^{x+1} + 2^{2x+1} = 96$$\\n\\neşitliğini sağlayan $x$ gerçek sayısı kaçtır?",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 4",
      "E) 6"
    ],
    "correctAnswer": "B",
    "trap": "$2^{2x+1}$ ifadesinin $2 \\cdot (2^2)^x = 2 \\cdot 4^x$ olduğunu kaçırmak. $4 \\cdot 4^x + 2 \\cdot 4^x = 6 \\cdot 4^x = 96 \\implies 4^x = 16 = 4^2 \\implies x=2$.",
    "hint": "$2^{2x+1} = 2^1 \\cdot 2^{2x} = 2 \\cdot 4^x$ biçiminde yaz.",
    "socraticPrompts": [
      "$2^{2x+1}$ terimini inceleyelim: $2^1 \\cdot 2^{2x} = 2 \\cdot (2^2)^x = 2 \\cdot 4^x$ yazabilir miyiz?",
      "$4^{x+1}$ terimi de $4 \\cdot 4^x$'tir. Toplarsan: $4 \\cdot 4^x + 2 \\cdot 4^x = ?$",
      "$6 \\cdot 4^x = 96$ denkleminde her iki tarafı 6'ya böl. $4^x = 16$ ise $x$ kaçtır?"
    ],
    "distractors": {
      "A": "$4^x = 16$ iken $x=1$ dedin. 4'ün karesi kaçtır?",
      "C": "96'yı 6'ya bölerken 16 yerine 64 bulmuş olabilir misin?"
    }
  },
  {
    "id": "q-21",
    "globalIndex": 21,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 1,
    "text": "$$2^3 \\cdot 2^4 \\cdot 2^5 = 2^a + 2^a + 2^a + 2^a$$\\n\\neşitliğini sağlayan $a$ değeri kaçtır?",
    "options": [
      "A) 8",
      "B) 9",
      "C) 10",
      "D) 11",
      "E) 12"
    ],
    "correctAnswer": "C",
    "trap": "Kitaptaki Soru 4 benzeri: Sol taraf çarpma ($2^{3+4+5} = 2^{12}$), sağ taraf toplama ($4 \\cdot 2^a = 2^{a+2}$). $a + 2 = 12 \\implies a = 10$. Öğrenci $a=12$ (E) diyebilir.",
    "hint": "Sol tarafı üsleri toplayarak, sağ tarafı $4 \\cdot 2^a$ olarak yaz.",
    "socraticPrompts": [
      "Sol taraf tamamen çarpma işlemidir: $2^3 \\cdot 2^4 \\cdot 2^5$. Tabanlar aynıyken üsler ne yapılır?",
      "Sol taraf $2^{12}$ oldu. Şimdi sağ tarafa bak: 4 tane $2^a$ toplanıyor. Tekrarlı toplamayı $4 \\cdot 2^a$ olarak yaz.",
      "4 sayısını $2^2$ yaparsan sağ taraf $2^{a+2}$ olur. $2^{12} = 2^{a+2}$ eşitliğinden $a$ kaçtır?"
    ],
    "distractors": {
      "E": "Sağ taraftaki 4 katsayısını eklemeyi unutup doğrudan $a=12$ dedin. Toplamada katsayı üsse $+2$ ekler!",
      "B": "Sol tarafın üslerini toplarken işlem hatası yaptın ($3+4+5=12$)."
    }
  },
  {
    "id": "q-22",
    "globalIndex": 22,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 2,
    "text": "**[SAT Math Benzeri]**\\n\\n$$72x^8 - 48x^7 = c x^k(3x - 2)$$\\n\\neşitliği her $x$ gerçek sayısı için sağlandığına göre $c + k$ toplamı kaçtır?",
    "options": [
      "A) 19",
      "B) 24",
      "C) 31",
      "D) 33",
      "E) 36"
    ],
    "correctAnswer": "C",
    "trap": "En büyük ortak bölen katsayıyı bulamamak. EBOB(72, 48) = 24. Ortak üs $x^7$. $24x^7(3x - 2)$ olur. $c = 24, k = 7 \\implies c + k = 31$.",
    "hint": "72 ile 48'in en büyük ortak bölenini ve $x$'in en küçük üssünü paranteze al.",
    "socraticPrompts": [
      "72 ile 48 sayılarının en büyük ortak böleni (EBOB) kaçtır?",
      "$x^8$ ve $x^7$ değişkenlerinin en küçük ortak üssü hangisidir?",
      "Ortak çarpan $24x^7$ olduğunda parantez içi $(3x - 2)$ kalır. O halde $c = 24$ ve $k = 7$ ise $c + k$ kaçtır?"
    ],
    "distractors": {
      "A": "Katsayı olarak 24 yerine 12 aldın ($12+7=19$). Oysa 72 ve 48'in en büyük ortak böleni 24'tür.",
      "B": "Sadece katsayı $c=24$'ü işaretledin, soru senden $c+k$ toplamını istiyor!"
    }
  },
  {
    "id": "q-23",
    "globalIndex": 23,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 3,
    "text": "$$\\frac{3^{x+4} - 3^{x+2}}{3^{x+2} + 3^{x+1}}$$\\n\\nkesrinin değeri kaçtır?",
    "options": [
      "A) 2",
      "B) 3",
      "C) 6",
      "D) 9",
      "E) 12"
    ],
    "correctAnswer": "C",
    "trap": "Bilinmeyen $x$'e bağlı kalacağını zannetmek. Pay: $3^{x+2}(3^2 - 1) = 8 \\cdot 3^{x+2}$. Payda: $3^{x+1}(3 + 1) = 4 \\cdot 3^{x+1}$. Oran: $(8/4) \\cdot 3^{(x+2)-(x+1)} = 2 \\cdot 3^1 = 6$.",
    "hint": "Pay ve paydayı en küçük üslerinin parantezine alarak sadeleştir.",
    "socraticPrompts": [
      "Payı en küçük kuvvet olan $3^{x+2}$ parantezine al: $3^{x+2}(3^2 - 1)$. Bu sayı kaçtır?",
      "Paydayı en küçük kuvvet olan $3^{x+1}$ parantezine al: $3^{x+1}(3 + 1)$. Bu sayı kaçtır?",
      "Pay $8 \\cdot 3^{x+2}$, payda $4 \\cdot 3^{x+1}$. Şimdi katsayıları birbirine, üslü ifadeleri de birbirine böl."
    ],
    "distractors": {
      "A": "Üslü ifadedeki 3 çarpanını unuttun ($8/4 = 2$). $3^{x+2} / 3^{x+1} = 3^1 = 3$ çarpanı da vardır!",
      "B": "Katsayılar oranını $(8/4 = 2)$ unutup sadece 3 buldun."
    }
  },
  {
    "id": "q-24",
    "globalIndex": 24,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 4,
    "text": "$$\\frac{9^{x+1} - 9^x}{3^{2x-1}}$$\\n\\nifadesinin sayısal değeri kaçtır?",
    "options": [
      "A) 8",
      "B) 12",
      "C) 18",
      "D) 24",
      "E) 72"
    ],
    "correctAnswer": "D",
    "trap": "Payda bulunan $3^{2x-1}$ ifadesini $9^x / 3$ olarak görmemek. Pay: $9^x(9 - 1) = 8 \\cdot 9^x$. Payda: $3^{2x} \\cdot 3^{-1} = 9^x / 3$. Kesir: $8 \\cdot 9^x / (9^x / 3) = 8 \\cdot 3 = 24$.",
    "hint": "$9^x = (3^2)^x = 3^{2x}$ dönüşümünü kullan.",
    "socraticPrompts": [
      "Paydaki $9^{x+1} - 9^x$ ifadesini $9^x$ parantezine alırsan ne kalır? $9^x(9 - 1) = 8 \\cdot 9^x$.",
      "Paydadaki $3^{2x-1}$ ifadesini parçala: $3^{2x} \\cdot 3^{-1} = 9^x / 3$.",
      "Şimdi payı paydaya böl: $(8 \\cdot 9^x) / (9^x / 3)$. Ters çevirip çarparsan $9^x$'ler sadeleşir, geriye ne kalır?"
    ],
    "distractors": {
      "A": "Paydadaki 3 bölenini ters çevirip çarpmak yerine göz ardı ettin.",
      "C": "İşlem basamaklarında katsayı çarpımında hata yaptın ($8 \\cdot 3 = 24$)."
    }
  },
  {
    "id": "q-25",
    "globalIndex": 25,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 5,
    "text": "$f(x) = 2^x$ fonksiyonu için,\\n\\n$$f(x+3) - f(x+1) = 48$$\\n\\neşitliğini sağlayan $x$ değeri kaçtır?",
    "options": [
      "A) 1",
      "B) 2",
      "C) 3",
      "D) 4",
      "E) 5"
    ],
    "correctAnswer": "C",
    "trap": "$2^{x+3} - 2^{x+1} = 2^2 = 4$ sanmak. $2^{x+1}(2^2 - 1) = 3 \\cdot 2^{x+1} = 48 \\implies 2^{x+1} = 16 = 2^4 \\implies x+1=4 \\implies x=3$.",
    "hint": "Fonksiyonda yerine yaz: $2^{x+3} - 2^{x+1} = 48$.",
    "socraticPrompts": [
      "Verilen fonksiyonda $f(x+3) = 2^{x+3}$ ve $f(x+1) = 2^{x+1}$ olur mu?",
      "Bu iki terimi $2^{x+1}$ parantezine alırsan: $2^{x+1}(2^2 - 1) = 3 \\cdot 2^{x+1}$.",
      "$3 \\cdot 2^{x+1} = 48$ ise her iki tarafı 3'e böl. $2^{x+1} = 16 = 2^4$ ise $x+1 = 4$ ve $x = ?$"
    ],
    "distractors": {
      "D": "$x+1 = 4$ denkleminde $x=3$ bulmak yerine doğrudan 4'ü işaretledin.",
      "B": "48'i 3'e bölerken 16 yerine 8 bulmuş olabilir misin?"
    }
  },
  {
    "id": "q-26",
    "globalIndex": 26,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 6,
    "text": "$$A = 2^{21} + 2^{20}, \\quad B = 3 \\cdot 2^{19}, \\quad C = 5 \\cdot 2^{19}$$\\n\\nsayıları veriliyor. **Buna göre $A, B, C$ sayılarının doğru sıralanışı hangisidir?**",
    "options": [
      "A) $B < C < A$",
      "B) $B < A < C$",
      "C) $C < B < A$",
      "D) $A < C < B$",
      "E) $A < B < C$"
    ],
    "correctAnswer": "A",
    "trap": "$A$ sayısını $2^{19}$ cinsinden yazarken katsayıyı yanlış hesaplamak. $A = 2^{19}(2^2 + 2) = 6 \\cdot 2^{19}$. Katsayılar: $B=3, C=5, A=6 \\implies B < C < A$.",
    "hint": "Hepsini $2^{19}$ ortak çarpanı türünden katsayılarıyla ifade et.",
    "socraticPrompts": [
      "Tüm sayıları en küçük üs olan $2^{19}$ tabanında ifade edebilir miyiz?",
      "$A = 2^{21} + 2^{20} = 2^{19}(2^2 + 2^1) = 2^{19}(4 + 2) = 6 \\cdot 2^{19}$.",
      "Şimdi katsayıları karşılaştır: $B = 3 \\cdot 2^{19}$, $C = 5 \\cdot 2^{19}$, $A = 6 \\cdot 2^{19}$. Küçükten büyüğe sırala."
    ],
    "distractors": {
      "B": "A sayısının katsayısını yanlış hesaplayarak C'den küçük zannettin.",
      "D": "Sıralamayı büyükten küçüğe yaptın, seçenekler küçükten büyüğedir."
    }
  },
  {
    "id": "q-27",
    "globalIndex": 27,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 7,
    "text": "$$4^6 \\cdot 5^{11} + 10^{11}$$\\n\\nsayısı **kaç basamaklıdır?**",
    "options": [
      "A) 10",
      "B) 11",
      "C) 12",
      "D) 13",
      "E) 14"
    ],
    "correctAnswer": "C",
    "trap": "$4^6 = 2^{12} = 2 \\cdot 2^{11}$ ayrımını yapamayıp üsleri toplayamamak. İlk terim: $2 \\cdot (2^{11} \\cdot 5^{11}) = 2 \\cdot 10^{11}$. Toplam: $2 \\cdot 10^{11} + 1 \\cdot 10^{11} = 3 \\cdot 10^{11}$. 3'ün arkasında 11 sıfır vardır; $1 + 11 = 12$ basamaklıdır.",
    "hint": "$4^6 = 2^{12} = 2 \\cdot 2^{11}$ yazarak $10^{11}$ elde et.",
    "socraticPrompts": [
      "$4^6$ sayısını 2 tabanında yaz: $(2^2)^6 = 2^{12}$.",
      "10 tabanı oluşturmak için $2^{11} \\cdot 5^{11} = 10^{11}$ elde etmemiz gerekir. $2^{12}$'den bir 2 ayırırsan: $2 \\cdot (2^{11} \\cdot 5^{11}) = 2 \\cdot 10^{11}$.",
      "Şimdi topla: $2 \\cdot 10^{11} + 1 \\cdot 10^{11} = 3 \\cdot 10^{11}$. 3 rakamının arkasında 11 tane sıfır varsa bu sayı kaç basamaklıdır?"
    ],
    "distractors": {
      "B": "Sadece sıfır sayısını (11) işaretledin. En baştaki 3 rakamı da bir basamak oluşturur: $1 + 11 = 12$!",
      "D": "Basamak sayısını hesaplarken fazladan 1 ekledin."
    }
  },
  {
    "id": "q-28",
    "globalIndex": 28,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 8,
    "text": "$$2^{a+2} + 2^{a+1} + 2^a = 112$$\\n\\neşitliğini sağlayan $a$ tam sayısı kaçtır?",
    "options": [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 5",
      "E) 6"
    ],
    "correctAnswer": "C",
    "trap": "$2^a$ parantezine alırken katsayıları $4+2=6$ sayıp $+1$'i unutmak. $2^a(4 + 2 + 1) = 7 \\cdot 2^a = 112 \\implies 2^a = 16 = 2^4 \\implies a=4$.",
    "hint": "$2^a$ parantezine al: $2^a(2^2 + 2^1 + 1) = 7 \\cdot 2^a$.",
    "socraticPrompts": [
      "Sol taraftaki terimleri en küçük kuvvet olan $2^a$ parantezine al.",
      "Parantez içi: $2^a(2^2 + 2^1 + 1) = 2^a(4 + 2 + 1) = 7 \\cdot 2^a$.",
      "$7 \\cdot 2^a = 112$ denkleminde 112'yi 7'ye böl. $2^a = 16$ ise $a$ kaçtır?"
    ],
    "distractors": {
      "B": "$2^a = 16$ iken 2'nin küpü sanıp 3 dedin. $2^4 = 16$ olduğunu hatırla.",
      "D": "112'yi 7'ye bölerken 16 yerine 32 buldun."
    }
  },
  {
    "id": "q-29",
    "globalIndex": 29,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 9,
    "text": "$2^x = m$ ve $3^x = n$ olduğuna göre,\\n\\n$$6^{x+1} - 2^{x+1} \\cdot 3^x$$\\n\\nifadesinin $m$ ve $n$ türünden eşiti aşağıdakilerden hangisidir?",
    "options": [
      "A) $2mn$",
      "B) $4mn$",
      "C) $6mn$",
      "D) $4(m+n)$",
      "E) $m^2 n$"
    ],
    "correctAnswer": "B",
    "trap": "$2^{x+1} \\cdot 3^x = 2 \\cdot 2^x \\cdot 3^x = 2 \\cdot 6^x$ olduğunu gözden kaçırmak. $6 \\cdot 6^x - 2 \\cdot 6^x = 4 \\cdot 6^x = 4 \\cdot (2^x \\cdot 3^x) = 4mn$.",
    "hint": "$6^{x+1} = 6 \\cdot 6^x$ ve $2^{x+1} \\cdot 3^x = 2 \\cdot 6^x$ biçiminde düzenle.",
    "socraticPrompts": [
      "$6^{x+1} = 6 \\cdot 6^x = 6 \\cdot (2^x \\cdot 3^x) = 6mn$ olarak yazılabilir mi?",
      "İkinci terim: $2^{x+1} \\cdot 3^x = 2 \\cdot 2^x \\cdot 3^x = 2 \\cdot (2^x \\cdot 3^x) = 2mn$.",
      "Şimdi bu iki ifadeyi birbirinden çıkar: $6mn - 2mn$ kaç eder?"
    ],
    "distractors": {
      "A": "İlk terimin katsayısını 6 yerine 4 aldın ($4 - 2 = 2$). $6^{x+1} = 6^1 \\cdot 6^x$ olduğunu hatırla.",
      "C": "Çıkarma yapmayı unutup sadece birinci terimi aldın."
    }
  },
  {
    "id": "q-30",
    "globalIndex": 30,
    "testId": "quiz-3",
    "testNo": "03",
    "testTitle": "Analitik Cebirsel Denklemler & SAT Formatı: Ortak Çarpan Modelleri",
    "testBadge": "ORTA - ZOR DÜZEY • CEBİRSEL DENKLEMLER & SAT MATEMATİK",
    "questionNo": 10,
    "text": "$$3^{x+1} + 3^x \\le 108$$\\n\\neşitsizliğini sağlayan **$x$ doğal sayılarının toplamı** kaçtır?",
    "options": [
      "A) 3",
      "B) 5",
      "C) 6",
      "D) 9",
      "E) 10"
    ],
    "correctAnswer": "C",
    "trap": "Doğal sayı dediği için 0'ı unutmak veya $x=3$ bulup sadece 3 işaretlemek. $3^x(3+1) = 4 \\cdot 3^x \\le 108 \\implies 3^x \\le 27 = 3^3 \\implies x \\le 3$. Doğal sayılar: $0, 1, 2, 3$. Toplam: $0+1+2+3 = 6$.",
    "hint": "Sol tarafı $3^x$ parantezine alıp 4'e böl, 0'ın da bir doğal sayı olduğunu unutma.",
    "socraticPrompts": [
      "Sol tarafı $3^x$ ortak parantezine al: $3^x(3 + 1) = 4 \\cdot 3^x$.",
      "$4 \\cdot 3^x \\le 108$ eşitsizliğinde her iki tarafı 4'e böl. $3^x \\le 27 = 3^3$ olduğuna göre $x \\le 3$ olur.",
      "Soru DOĞAL SAYILARIN toplamını istiyor. Doğal sayılar kaçtan başlar? 0 bir doğal sayı mıdır? $0 + 1 + 2 + 3$ toplamı kaçtır?"
    ],
    "distractors": {
      "A": "Sadece en büyük sayı olan 3'ü aldın. Soru bu sayıların toplamını soruyor!",
      "B": "0'ı dahil etmedin ama toplama etkisi olmasa da işlem hatası yaptın ($1+2+3 = 6$)."
    }
  },
  {
    "id": "q-31",
    "globalIndex": 31,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 1,
    "text": "Bir biyoteknoloji laboratuvarında her birinin kütlesi $10^{-14}\\text{ gram}$ olan özdeş bakterilerden 1. kültür ortamında $4^7$ adet, 2. kültür ortamında ise $2^{16}$ adet bulunmaktadır.\\n\\n**Buna göre bu iki kültür ortamındaki tüm bakterilerin toplam kütlesi kaç gramdır?**",
    "options": [
      "A) $5^{-11}$",
      "B) $5^{-12}$",
      "C) $5^{-13}$",
      "D) $2^{-13}$",
      "E) $10^{-13}$"
    ],
    "correctAnswer": "C",
    "trap": "Kitaptaki Soru 5 modellemesi: 1. kültür $4^7 = 2^{14}$, 2. kültür $2^{16}$. Toplam bakteri: $2^{14}(1 + 2^2) = 5 \\cdot 2^{14}$. Toplam kütle: $5 \\cdot 2^{14} \\cdot 10^{-14} = 5 \\cdot 2^{14} \\cdot (2^{-14} \\cdot 5^{-14}) = 5^1 \\cdot 5^{-14} = 5^{-13}$.",
    "hint": "$10^{-14} = 2^{-14} \\cdot 5^{-14}$ şeklinde çarpanlarına ayrılır.",
    "socraticPrompts": [
      "Önce her iki kültürdeki bakteri adetlerini 2 tabanında yaz: $4^7 = (2^2)^7 = 2^{14}$ ve $2^{16}$.",
      "Toplam bakteri adedi: $2^{14} + 2^{16} = 2^{14}(1 + 2^2) = 5 \\cdot 2^{14}$ olur.",
      "Toplam kütle: $(5 \\cdot 2^{14}) \\cdot 10^{-14}$. $10^{-14} = 2^{-14} \\cdot 5^{-14}$ olduğuna göre $2^{14}$ ile $2^{-14}$ sadeleşince ne kalır?"
    ],
    "distractors": {
      "B": "$5^1 \\cdot 5^{-14} = 5^{1-14} = 5^{-13}$ yerine $5^{-12}$ buldun. $1 - 14 = -13$ eder.",
      "A": "Kuvvetleri toplarken pozitif/negatif işaret hatası yaptın."
    }
  },
  {
    "id": "q-32",
    "globalIndex": 32,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 2,
    "text": "Aşağıdaki tabloda geleneksel yük, kile ve şinik ölçü birimleri arasındaki ilişki verilmiştir:\\n\\n$$\\begin{array}{|c|c|}\\hline \\textbf{Birim} & \\textbf{Karşılığı} \\\\\\hline 1\\text{ Yük} & 4\\text{ Kile} \\\\\\hline 1\\text{ Kile} & 4\\text{ Şinik} \\\\\\hline\\end{array}$$\\n\\nBir depoda bulunan $2^{10}$ yük buğdayın $2^{13}$ şiniklik kısmı satılıyor.\\n\\n**Buna göre depoda kaç kile buğday kalmıştır?**",
    "options": [
      "A) $2^9$",
      "B) $2^{10}$",
      "C) $2^{11}$",
      "D) $2^{12}$",
      "E) $2^{13}$"
    ],
    "correctAnswer": "C",
    "trap": "Kitaptaki Soru 6 uyarlaması: $2^{10}$ Yük $= 2^{10} \\cdot 4 = 2^{12}$ Kile. Satılan $2^{13}$ Şinik $= 2^{13} / 4 = 2^{11}$ Kile. Kalan: $2^{12} - 2^{11} = 2^{11}(2 - 1) = 2^{11}$ Kile.",
    "hint": "Tüm miktarları istenen birim olan 'Kile' cinsine dönüştür.",
    "socraticPrompts": [
      "Soru sonucu KİLE cinsinden istiyor. O halde tüm değerleri kileye çevirelim.",
      "$2^{10}$ Yük kaç kiledir? (1 Yük = 4 Kile $= 2^2$ Kile olduğuna göre $2^{10} \\cdot 2^2 = 2^{12}$ Kile).",
      "Satılan $2^{13}$ Şinik kaç kiledir? (1 Kile = 4 Şinik $= 2^2$ Şinik $\\implies 2^{13} / 2^2 = 2^{11}$ Kile). Kalan kile miktarını bulmak için $2^{12} - 2^{11}$ çıkar."
    ],
    "distractors": {
      "B": "Satılan kısmı 4'e bölmek yerine 2'ye böldün.",
      "D": "Çıkarma yaparken $2^{12} - 2^{11} = 2^{11}$ yerine $2^{12}$'ye yakın bir değer aldın."
    }
  },
  {
    "id": "q-33",
    "globalIndex": 33,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 3,
    "text": "Dijital veri depolamada $1\\text{ TB} = 2^{10}\\text{ GB}$ ve $1\\text{ GB} = 2^{10}\\text{ MB}$ eşitlikleri geçerlidir.\\n\\nKapasitesi $2^5\\text{ TB}$ olan bir bulut sunucusunun $2^{23}\\text{ MB}$'lık kısmı doludur.\\n\\n**Buna göre bu bulut sunucusunda boş kalan alan kaç TB'dir?**",
    "options": [
      "A) $2^3$",
      "B) $2^4$",
      "C) $3 \\cdot 2^3$",
      "D) $7 \\cdot 2^2$",
      "E) $2^5 - 2$"
    ],
    "correctAnswer": "C",
    "trap": "$1\\text{ TB} = 2^{20}\\text{ MB}$ ilişkisini kuramamak. Dolu alan: $2^{23} / 2^{20} = 2^3\\text{ TB} = 8\\text{ TB}$. Boş alan: $2^5 - 2^3 = 32 - 8 = 24\\text{ TB} = 3 \\cdot 2^3\\text{ TB}$.",
    "hint": "Önce $2^{23}\\text{ MB}$'ı TB'ye çevir ($1\\text{ TB} = 2^{20}\\text{ MB}$), sonra toplamdan çıkar.",
    "socraticPrompts": [
      "1 TB kaç MB eder? $1\\text{ TB} = 2^{10}\\text{ GB} = 2^{10} \\cdot 2^{10}\\text{ MB} = 2^{20}\\text{ MB}$.",
      "Dolu olan $2^{23}\\text{ MB}$ kaç TB'dir? $2^{23} / 2^{20} = 2^3\\text{ TB} = 8\\text{ TB}$.",
      "Kapasite $2^5 = 32\\text{ TB}$ idi. Boş alan: $32 - 8 = 24\\text{ TB}$. 24 sayısını üslü katsayı olarak $3 \\cdot 2^3$ biçiminde yazabilir misin?"
    ],
    "distractors": {
      "A": "Sadece dolu alanı hesaplayıp boş alan yerine 8 TB ($2^3$) işaretledin.",
      "B": "$32 - 8 = 24$ yerine 16 ($2^4$) hesapladın."
    }
  },
  {
    "id": "q-34",
    "globalIndex": 34,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 4,
    "text": "Kalınlığı $2^{-4}\\text{ mm}$ olan bir mukavva her adımda tam ortasından ikiye katlanmaktadır.\\n\\n**Buna göre 8. katlama sonundaki kalınlık, 6. katlama sonundaki kalınlıktan kaç mm fazladır?**",
    "options": [
      "A) 8",
      "B) 12",
      "C) 14",
      "D) 16",
      "E) 24"
    ],
    "correctAnswer": "B",
    "trap": "Her katlamada kalınlığın iki katına çıktığını bilip çıkarma yaparken $2^4 - 2^2 = 2^2 = 4$ yanılgısına düşmek. 8. katlama: $2^{-4} \\cdot 2^8 = 2^4 = 16\\text{ mm}$. 6. katlama: $2^{-4} \\cdot 2^6 = 2^2 = 4\\text{ mm}$. Fark: $16 - 4 = 12\\text{ mm}$.",
    "hint": "$n$. katlamada kalınlık $2^{-4} \\cdot 2^n$ olur.",
    "socraticPrompts": [
      "Kağıt her katlandığında kalınlığı 2 katına çıkar. $n$. katlamadaki kalınlık: $2^{-4} \\cdot 2^n = 2^{n-4}\\text{ mm}$.",
      "8. katlamada kalınlık: $2^{8-4} = 2^4 = 16\\text{ mm}$.",
      "6. katlamada kalınlık: $2^{6-4} = 2^2 = 4\\text{ mm}$. İkisi arasındaki fark kaç mm'dir?"
    ],
    "distractors": {
      "A": "Farkı alırken üsleri çıkarmayı denedin ($2^4 - 2^2 = 2^2 = 4$ veya 8). Üslü sayılarda gerçek değerleri hesaplayıp çıkar.",
      "D": "Doğrudan 8. katlamadaki 16 mm değerini işaretledin, soru aradaki farkı istiyor."
    }
  },
  {
    "id": "q-35",
    "globalIndex": 35,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 5,
    "text": "Bir fraktal ağaç modelinde 1. adımda ana gövdeden 3 dal çıkmakta, sonraki her adımda ise var olan her daldan 3 yeni dal filizlenmektedir.\\n\\n**Buna göre 3. ve 4. adımda oluşan yeni dalların toplam sayısı, 1. ve 2. adımda oluşan yeni dalların toplam sayısının kaç katıdır?**",
    "options": [
      "A) 3",
      "B) 6",
      "C) 9",
      "D) 18",
      "E) 27"
    ],
    "correctAnswer": "C",
    "trap": "Tek tek hesaplayıp bölmek yerine parantez mantığını kavramak: Pay $= 3^3 + 3^4 = 3^3(1 + 3) = 4 \\cdot 3^3$. Payda $= 3^1 + 3^2 = 3(1 + 3) = 4 \\cdot 3^1$. Oran: $(4 \\cdot 3^3) / (4 \\cdot 3) = 3^2 = 9$.",
    "hint": "Payı $3^3$, paydayı $3^1$ parantezine alıp $(1+3)$ çarpanlarını sadeleştir.",
    "socraticPrompts": [
      "Payı yazalım: 3. ve 4. adımda oluşan dallar: $3^3 + 3^4 = 3^3(1 + 3) = 4 \\cdot 3^3$.",
      "Paydayı yazalım: 1. ve 2. adımda oluşan dallar: $3^1 + 3^2 = 3(1 + 3) = 4 \\cdot 3^1$.",
      "Bu iki ifadeyi birbirine oranla: $(4 \\cdot 3^3) / (4 \\cdot 3^1)$. 4'ler sadeleşirse geriye ne kalır?"
    ],
    "distractors": {
      "A": "Oranlama yaparken $3^3 / 3 = 3^2 = 9$ yerine 3 buldun.",
      "E": "Tüm adımları toplayıp gereksiz büyük bir sayı buldun."
    }
  },
  {
    "id": "q-36",
    "globalIndex": 36,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 6,
    "text": "Eşit kollu bir terazinin sol kefesinde her birinin kütlesi $4^5\\text{ gram}$ olan 6 adet özdeş sarı cisim bulunmaktadır.\\n\\n**Terazinin sağ kefesinde bulunan $2^9\\text{ gram}$ kütleli mavi cisimlerden kaç adet konulursa terazi dengede kalır?**",
    "options": [
      "A) 6",
      "B) 8",
      "C) 12",
      "D) 16",
      "E) 24"
    ],
    "correctAnswer": "C",
    "trap": "Sol kefe: $6 \\cdot 4^5 = 6 \\cdot (2^2)^5 = 6 \\cdot 2^{10} = 6 \\cdot 2 \\cdot 2^9 = 12 \\cdot 2^9\\text{ gram}$. Sağ kefedeki her mavi cisim $2^9\\text{ gram}$ olduğundan $(12 \\cdot 2^9) / 2^9 = 12$ adet gereklidir.",
    "hint": "Sol kefenin toplam kütlesini 2 tabanında yaz ve $2^9$'a böl.",
    "socraticPrompts": [
      "Sol kefenin toplam kütlesi: $6 \\cdot 4^5$. $4^5 = (2^2)^5 = 2^{10}$ olduğuna göre kütle $6 \\cdot 2^{10}\\text{ gram}$ olur.",
      "$6 \\cdot 2^{10}$ ifadesini $2^9$ cinsinden yaz: $6 \\cdot 2^1 \\cdot 2^9 = 12 \\cdot 2^9\\text{ gram}$.",
      "Sağ kefedeki her mavi cisim $2^9\\text{ gram}$ olduğuna göre sol kefeyi dengelemek için bunlardan kaç tane gerekir?"
    ],
    "distractors": {
      "A": "Sol kefedeki 6 katsayısını $2^{10}$'dan gelen 2 ile çarpmayı unutup 6 dedin.",
      "D": "Taban dönüştürmede işlem hatası yaptın."
    }
  },
  {
    "id": "q-37",
    "globalIndex": 37,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 7,
    "text": "A deposunda $3^8\\text{ litre}$, B deposunda ise $3^7\\text{ litre}$ su bulunmaktadır.\\n\\n**İki depodaki su miktarının birbirine eşit olması için A deposundan B deposuna kaç litre su aktarılmalıdır?**",
    "options": [
      "A) $3^6$",
      "B) $2 \\cdot 3^6$",
      "C) $3^7$",
      "D) $2 \\cdot 3^7$",
      "E) $3^8 / 2$"
    ],
    "correctAnswer": "C",
    "trap": "Doğrudan depolar arasındaki fark kadar aktarmak (fark $2 \\cdot 3^7$ olduğu için D seçeneği çeldiricidir). Eşitlenmesi için farkın YARISI aktarılmalıdır: $(3^8 - 3^7)/2 = 3^7(3 - 1)/2 = 3^7$.",
    "hint": "İki depodaki farkı bul ve yarısını al.",
    "socraticPrompts": [
      "İki depodaki su farkını bulalım: $3^8 - 3^7$. $3^7$ parantezine alırsan $3^7(3 - 1) = 2 \\cdot 3^7$ litre fark vardır.",
      "Kritik düşünme: Eğer farkın tamamını ($2 \\cdot 3^7$) aktarırsan bu kez B deposu A'dan çok daha fazla olmaz mı?",
      "Eşitliği sağlamak için aradaki farkın YARISINI aktarmalısın: $(2 \\cdot 3^7) / 2$ kaç eder?"
    ],
    "distractors": {
      "D": "Farkın tamamını aktarmayı düşündün ($2 \\cdot 3^7$). Bu durumda B deposu fazla hale gelir, farkın yarısı aktarılmalıdır!",
      "E": "A deposunun yarısını aktarmayı denedin."
    }
  },
  {
    "id": "q-38",
    "globalIndex": 38,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 8,
    "text": "Bir laboratuvar tüpünde başlangıçta $8^6$ adet bakteri bulunmaktadır. Bu ortama uygulanan bir dezenfektan sonucunda bakterilerin $\\dfrac{3}{4}$'ü yok olmuştur.\\n\\n**Buna göre ortamda yok olan (ölen) bakteri sayısı aşağıdakilerden hangisidir?**",
    "options": [
      "A) $2^{16}$",
      "B) $2^{17}$",
      "C) $3 \\cdot 2^{16}$",
      "D) $3 \\cdot 2^{17}$",
      "E) $7 \\cdot 2^{15}$"
    ],
    "correctAnswer": "C",
    "trap": "Kalan bakteri ($2^{16}$) ile ölen bakteriyi ($3 \\cdot 2^{16}$) karıştırmak. $8^6 = (2^3)^6 = 2^{18}$. Ölen miktar: $2^{18} \\cdot (3/4) = 2^{18} \\cdot 3 \\cdot 2^{-2} = 3 \\cdot 2^{16}$.",
    "hint": "$8^6 = 2^{18}$ yaz ve $3/4$ ile çarp.",
    "socraticPrompts": [
      "Başlangıçtaki bakteri sayısını 2 tabanında yaz: $8^6 = (2^3)^6 = 2^{18}$.",
      "Bakterilerin $3/4$'ü öldüğüne göre ölen bakteri sayısı: $2^{18} \\cdot \\frac{3}{4}$ olur.",
      "4 yerine $2^2$ yazarsan: $2^{18} \\cdot 3 \\cdot 2^{-2} = 3 \\cdot 2^{18-2}$. Sonuç ne olur?"
    ],
    "distractors": {
      "A": "Hayatta kalan bakteri sayısını ($1/4 = 2^{16}$) işaretledin! Soru senden YOK OLAN (ölen) bakteri sayısını istiyor.",
      "D": "Üs çıkarma işleminde hata yaptın ($18 - 2 = 16$)."
    }
  },
  {
    "id": "q-39",
    "globalIndex": 39,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 9,
    "text": "Bir matematiksel algoritma klavyeden girilen bir $x$ tam sayısı için ekrana şu değeri basmaktadır:\\n\\n$$\\text{Sonuç} = 2^{x+3} - 2^{x+1}$$\\n\\n**Algoritmanın ekrana bastığı sonuç 192 olduğuna göre girilen $x$ sayısı kaçtır?**",
    "options": [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6",
      "E) 7"
    ],
    "correctAnswer": "C",
    "trap": "$2^{x+1}$ parantezine alma hatası: $2^{x+1}(2^2 - 1) = 3 \\cdot 2^{x+1} = 192 \\implies 2^{x+1} = 64 = 2^6 \\implies x+1=6 \\implies x=5$. Öğrenci $x=6$ (D) işaretleyebilir.",
    "hint": "$2^{x+1}$ parantezine alıp 3'e böl.",
    "socraticPrompts": [
      "Algoritmanın hesapladığı $2^{x+3} - 2^{x+1}$ ifadesini $2^{x+1}$ parantezine al.",
      "$2^{x+1}(2^2 - 1) = 3 \\cdot 2^{x+1}$ olur. Bu sonuç 192'ye eşitmiş.",
      "$3 \\cdot 2^{x+1} = 192 \\implies 2^{x+1} = 64$. 64 sayısı 2'nin 6. kuvvetidir ($2^6$). $x+1 = 6$ ise $x$ kaçtır?"
    ],
    "distractors": {
      "D": "$x+1 = 6$ denkleminde $x=5$ bulmak yerine doğrudan 6 işaretledin.",
      "B": "192'yi 3'e bölerken 64 yerine 32 buldun."
    }
  },
  {
    "id": "q-40",
    "globalIndex": 40,
    "testId": "quiz-4",
    "testNo": "04",
    "testTitle": "Beceri Temelli Modelleme & Yeni Nesil Problemler: Gerçek Yaşam Uygulamaları",
    "testBadge": "İLERİ DÜZEY • BECERİ TEMELLİ MODELLEME & YENİ NESİL",
    "questionNo": 10,
    "text": "Aşağıda domino taşlarının devrilme kuralına benzer biçimde düzenlenmiş üslü bir toplama işlemi verilmiştir:\\n\\n$$2^4 + 2^4 + 2^5 + 2^6 + 2^7 + 2^8 + 2^9 + 2^{10}$$\\n\\n**Buna göre bu işlemin sonucu aşağıdakilerden hangisine eşittir?**",
    "options": [
      "A) $2^{10}$",
      "B) $2^{11}$",
      "C) $2^{12}$",
      "D) $2^{13}$",
      "E) $2^{14}$"
    ],
    "correctAnswer": "B",
    "trap": "Son terim $2^{10}$ olduğu için kafadan $2^{10}$ veya üsleri toplayarak devasa bir sayı işaretlemek. Domino etkisi: $2^4 + 2^4 = 2^5$, $2^5 + 2^5 = 2^6 \\dots$ en son $2^{10} + 2^{10} = 2^{11}$.",
    "hint": "En soldaki iki terimi toplayarak sağa doğru adım adım ilerle.",
    "socraticPrompts": [
      "İfadeyi ikişer ikişer domino şeklinde topla: En soldaki $2^4 + 2^4$ neye eşittir?",
      "$2 \\cdot 2^4 = 2^5$ buldun. Şimdi yanındaki $2^5$ ile topla: $2^5 + 2^5 = 2^6$ eder.",
      "Bu zincir sağa doğru ilerlerken her adımda üs 1 artar. En son $2^{10} + 2^{10}$ toplandığında sonuç ne olur?"
    ],
    "distractors": {
      "A": "En sondaki terim $2^{10}$ olduğu için sonucun da $2^{10}$ olacağını sandın.",
      "C": "Adım sayısını fazla sayarak $2^{12}$ buldun."
    }
  }
];
