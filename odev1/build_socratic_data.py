# -*- coding: utf-8 -*-
"""
Generate enriched Socratic dataset for mobile learning application
4 Quizzes x 10 Questions = 40 Questions
Includes:
- 3-level Socratic Inquiries (Never gives away the answer, only asks thought-provoking questions)
- Option-specific Socratic feedback for each wrong choice
- Misconception classification
"""

import json
import sys
import os

sys.path.append(os.path.abspath('.'))
sys.path.append(os.path.abspath('ogretmen_cozum'))

from build_quiz_data import quizzes

socratic_data = []

# Socratic dialogues handcrafted for each question to ensure high pedagogical rigor
socratic_extensions = {
    # Quiz 1
    (1, 1): {
        "prompts": [
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
    (1, 2): {
        "prompts": [
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
    (1, 3): {
        "prompts": [
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
    (1, 4): {
        "prompts": [
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
    (1, 5): {
        "prompts": [
            "İşlemi bir kerede çözmek yerine soldan sağa ikişer ikişer gruplayalım: İlk iki terim $2^5 + 2^5$ neye eşittir?",
            "Harika, $2 \\cdot 2^5 = 2^6$ buldun. Şimdi bu sonucu yanındaki üçüncü terimle topla: $2^6 + 2^6$ ne eder?",
            "Tıpkı devrilen domino taşları gibi! Elindeki yeni sonucu son terim olan $2^7$ ile toplarsan nihai sonuç ne olur?"
        ],
        "distractors": {
            "A": "Sadece ilk adımı hesaplamış olabilir misin? Son terim $2^7$ idi, sonuç ondan daha büyük olmalı.",
            "E": "Tüm üsleri toplamayı denedin ($5+5+6+7=23$ veya $24$). Arada çarpma değil toplama var; domino mantığını kullan."
        }
    },
    (1, 6): {
        "prompts": [
            "Burada kaç tane $2^{-3}$ toplanıyor? Bunu adet $\\times$ terim biçiminde yazabilir misin?",
            "Çok güzel: $4 \\cdot 2^{-3}$. Peki 4 sayısını 2 tabanında bir üslü sayı olarak nasıl yazarsın?",
            "Şimdi $2^2 \\cdot 2^{-3}$ çarpımını yap. Tabanlar aynıyken üsler toplanır: $2 + (-3)$ kaç eder?"
        ],
        "distractors": {
            "A": "Üsleri toplamayı denedin ($-3 - 3 - 3 - 3 = -12$). Tekrarlı toplama yaparken üsler toplanmaz, adet ile çarpılır!",
            "B": "Negatif kuvvet ile toplamada bir işlem hatası yaptın. $2^2$ ile $2^{-3}$ çarpılırken üsler $2 + (-3)$ olur."
        }
    },
    (1, 7): {
        "prompts": [
            "Pay kısmında kaç tane $6^5$ toplanıyor? Bunu bir çarpım olarak ifade et.",
            "Payda kısmında kaç tane $3^6$ toplanıyor? Bunu da bir çarpım olarak yaz.",
            "$6 \\cdot 6^5 = 6^6$ olur. $6^6$'yı $(2 \\cdot 3)^6 = 2^6 \\cdot 3^6$ olarak açıp paydadaki $2 \\cdot 3^6$ ile sadeleştirebilir misin?"
        ],
        "distractors": {
            "A": "Paydaki katsayı sadeleştirmesinde bir 2 çarpanı eksik kalmış olabilir mi? $2^6 / 2 = 2^5 = 32$.",
            "C": "Paydadaki 2 bölenini unuttun ($2^6 = 64$). Paydada $3^6 + 3^6 = 2 \\cdot 3^6$ olduğunu hatırla."
        }
    },
    (1, 8): {
        "prompts": [
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
    (1, 9): {
        "prompts": [
            "Bir kenarı $2^4$ olan tek bir karenin alanı nasıl hesaplanır? ($a^2$ formülünü hatırla)",
            "$(2^4)^2$ üssün üssü kuralına göre $2^8$ eder. Bu karelerden kaç tanesi yan yana konuluyor?",
            "8 tane $2^8$ alanını toplamak veya $8 \\cdot 2^8$ çarpmak: 8 sayısını $2^3$ olarak yazıp üsleri toplayabilir misin?"
        ],
        "distractors": {
            "A": "Alanı hesaplamak yerine karenin bir kenarını 8 ile çarpmış olabilir misin? Alan $a^2$ ile başlar.",
            "B": "8 karesini $2^3$ yerine $2^2$ olarak almış olabilir misin? $2^3 \\cdot 2^8 = 2^{11}$ eder."
        }
    },
    (1, 10): {
        "prompts": [
            "I. önerme: $2^a + 2^a = 2 \\cdot 2^a = 2^{a+1}$. Bu doğru mu?",
            "II. önerme: $3^a + 3^a + 3^a = 3 \\cdot 3^a = 3^{a+1}$. Peki $3^{a+1}$ ifadesi her zaman $9^a$ sayısına eşit midir? (Örneğin $a=1$ verip dene)",
            "III. önerme: $5 \\cdot 2^a - 1 \\cdot 2^a = (5-1) \\cdot 2^a = 4 \\cdot 2^a$. 4 yerine $2^2$ yazarsan ne elde edersin?"
        ],
        "distractors": {
            "C": "II. önermeyi doğru kabul ettin. $a=1$ için sol taraf $3+3+3=9$, sağ taraf $9^1=9$. Ancak $a=2$ için sol taraf $9+9+9=27$, sağ taraf $9^2=81$! Her $a$ için doğru mudur?",
            "E": "Tüm önermelerin doğru olduğunu düşündün. Tabanların toplanması ($3+3+3=9$) kural dışıdır."
        }
    },

    # Quiz 2
    (2, 1): {
        "prompts": [
            "Pay kısmındaki üslere bak: $2^{10}, 2^{12}, 2^{14}$. Bunların en küçüğü hangisidir?",
            "Payı $2^{10}$ parantezine aldığında içeride ne kalır? $2^{10}(1 + 2^? + 2^?)$",
            "Parantez içindeki ifade ile paydadaki ifadenin birebir aynı olduğunu fark ettin mi? Sadeleşince geriye ne kalır?"
        ],
        "distractors": {
            "A": "Paranteze alırken üsleri yanlış çıkardın. $14 - 10 = 4$ ve $12 - 10 = 2$ olur.",
            "D": "Pay ve paydayı sadeleştirirken bir adımda işlem hatası yaptın. Kalan terim doğrudan ortak parantez katsayısıdır."
        }
    },
    (2, 2): {
        "prompts": [
            "Paydada 4 ve 16 tabanları var. Bunların hepsini 2'nin kuvveti olarak yazabilir misin? $4^4 = (2^2)^4 = ?$ ve $16^2 = (2^4)^2 = ?$",
            "Payda şöyle oldu: $3 \\cdot 2^8 - 2^8$. Ortak $2^8$ parantezine alırsan katsayılar $(3-1)$ ne yapar?",
            "Payda $2 \\cdot 2^8 = 2^9$ oldu. Şimdi paydaki $5 \\cdot 2^8$ ile paydadaki $2^9$'u sadeleştir."
        ],
        "distractors": {
            "B": "Paydaki 5 katsayısını göz ardı etmiş olabilir misin? Sonuç tam sayı değil rasyonel bir sayıdır.",
            "E": "Paydadaki $2^9$'u $2^8$ ile sadeleştirirken 2 bölenini unuttun."
        }
    },
    (2, 3): {
        "prompts": [
            "Sol tarafta en küçük üs $5^8$'dir. İfadeyi $5^8$ parantezine alalım: $5^8(5^? - 5^? + ?)$",
            "$5^{10}$ teriminden $5^2 = 25$, $5^9$ teriminden $5^1 = 5$, peki $5^8$ teriminden ne kalır?",
            "Kendisine bölündüğünde kalan $+1$'i unutma: $25 - 5 + 1$ kaç eder?"
        ],
        "distractors": {
            "C": "En sondaki $5^8$ teriminden kalan $+1$'i unuttun ($25 - 5 = 20$). Ortak paranteze aldığında terim sayısı değişmez!",
            "E": "Katsayıları toplamak yerine doğrudan $5^2 = 25$ aldın."
        }
    },
    (2, 4): {
        "prompts": [
            "Paydaki $10^6 - 10^5$ ifadesinde küçük olan $10^5$ parantezine alırsan içeride ne kalır? $10^5(10 - 1)$",
            "$10 - 1 = 9$ olduğuna göre pay $9 \\cdot 10^5$ oldu. Paydada ne vardı?",
            "Payda $9 \\cdot 10^4$ idi. 9'lar sadeleşirse $10^5 / 10^4$ kaça eşittir?"
        ],
        "distractors": {
            "A": "Bölme işleminde üsleri çıkarırken $10^{5-4} = 10^1 = 10$ yerine 1 buldun.",
            "C": "9 katsayısını sadeleştirmeden sonuca dahil etmiş olabilir misin?"
        }
    },
    (2, 5): {
        "prompts": [
            "12 sayısını $2 \\cdot 6$ olarak yazabilirsin. O halde $12^4$ ifadesi $2^4 \\cdot 6^4$ olur mu?",
            "Şimdi payı $6^4$ parantezine al: $6^4(2^4 - 1)$.",
            "Paydadaki $6^4$ ile sadeleşince geriye sadece $2^4 - 1$ kalır. $2^4$ kaçtır ve 1 çıkarırsan ne kalır?"
        ],
        "distractors": {
            "A": "Paydaki çıkarmayı $(12-6)^4 = 6^4$ olarak yaptın! Üslü sayılarda tabanlar birbirinden çıkarılamaz!",
            "D": "$2^4 = 16$ bulup 1 çıkarmayı unuttun."
        }
    },
    (2, 6): {
        "prompts": [
            "Sol taraftaki en küçük kuvvet $3^x$'tir. $3^x$ parantezine aldığında: $3^x(3^2 - 3^1 + 1)$",
            "Parantez içindeki sayıları hesapla: $9 - 3 + 1$ kaç eder?",
            "$7 \\cdot 3^x = 63$ denkleminde her iki tarafı 7'ye bölersen $3^x$ kaça eşit olur? Buradan $x$ kaçtır?"
        ],
        "distractors": {
            "A": "$3^x = 9$ bulup $x=1$ dedin. 3'ün hangi kuvveti 9'dur?",
            "C": "63'ü 7'ye bölerken işlem hatası yapmış olabilir misin?"
        }
    },
    (2, 7): {
        "prompts": [
            "$2^{n+3} = 2^n \\cdot 2^3 = 8 \\cdot 2^n$ biçiminde yazılabilir mi?",
            "Benzer şekilde $2^{n+1} = 2 \\cdot 2^n$ olur. Şimdi tüm ifadeyi $2^n$ parantezine al.",
            "$2^n(8 - 2 + 1) = 7 \\cdot 2^n$. Soru bize $2^n = x$ demişti, o halde cevap nedir?"
        ],
        "distractors": {
            "A": "Parantez içi katsayıları $8 - 2 - 1 = 5$ olarak çıkardın. İşaretin $+2^n$ olduğuna dikkat et.",
            "B": "En sondaki $+2^n$ teriminin $+1$ katsayısını unuttun ($8 - 2 = 6$)."
        }
    },
    (2, 8): {
        "prompts": [
            "Payı $2^8$ ortak parantezine alırsan içeride $(2 + 1)$ kalır. Pay kaça eşittir?",
            "Paydayı $2^6$ ortak parantezine alırsan içeride $(2 - 1)$ kalır. Payda kaça eşittir?",
            "Pay $3 \\cdot 2^8$, payda ise $1 \\cdot 2^6$ oldu. Üsleri çıkarırsan $3 \\cdot 2^{8-6} = 3 \\cdot 2^2$ kaç eder?"
        ],
        "distractors": {
            "A": "$3 \\cdot 4 = 12$ yerine $3 \\cdot 2 = 6$ hesaplamış olabilir misin?",
            "B": "Paydaki 3 katsayısını unutarak sadece $2^2 = 4$ veya 8 buldun."
        }
    },
    (2, 9): {
        "prompts": [
            "Parantez içindeki terimleri adım adım soldan sağa açalım: $2^{12} - 2^{11} = ?$",
            "$2^{12} = 2 \\cdot 2^{11}$ olduğuna göre $2 \\cdot 2^{11} - 2^{11} = 2^{11}$ kalır.",
            "Şimdi sıradaki terimi çıkar: $2^{11} - 2^{10} = 2^{10}$. Bu şekilde sonuna kadar gidersen en son ne kalır?"
        ],
        "distractors": {
            "E": "Tüm toplamın $2^{12}$'ye eşit olduğunu varsayıp sonucun 0 olduğunu düşündün. Oysa her adımda geriye bir parça kalır!"
        }
    },
    (2, 10): {
        "prompts": [
            "$2^{2x+1}$ terimini inceleyelim: $2^1 \\cdot 2^{2x} = 2 \\cdot (2^2)^x = 2 \\cdot 4^x$ yazabilir miyiz?",
            "$4^{x+1}$ terimi de $4 \\cdot 4^x$'tir. Toplarsan: $4 \\cdot 4^x + 2 \\cdot 4^x = ?$",
            "$6 \\cdot 4^x = 96$ denkleminde her iki tarafı 6'ya böl. $4^x = 16$ ise $x$ kaçtır?"
        ],
        "distractors": {
            "A": "$4^x = 16$ iken $x=1$ dedin. 4'ün karesi kaçtır?",
            "C": "96'yı 6'ya bölerken 16 yerine 64 bulmuş olabilir misin?"
        }
    },

    # Quiz 3
    (3, 1): {
        "prompts": [
            "Sol taraf tamamen çarpma işlemidir: $2^3 \\cdot 2^4 \\cdot 2^5$. Tabanlar aynıyken üsler ne yapılır?",
            "Sol taraf $2^{12}$ oldu. Şimdi sağ tarafa bak: 4 tane $2^a$ toplanıyor. Tekrarlı toplamayı $4 \\cdot 2^a$ olarak yaz.",
            "4 sayısını $2^2$ yaparsan sağ taraf $2^{a+2}$ olur. $2^{12} = 2^{a+2}$ eşitliğinden $a$ kaçtır?"
        ],
        "distractors": {
            "E": "Sağ taraftaki 4 katsayısını eklemeyi unutup doğrudan $a=12$ dedin. Toplamada katsayı üsse $+2$ ekler!",
            "B": "Sol tarafın üslerini toplarken işlem hatası yaptın ($3+4+5=12$)."
        }
    },
    (3, 2): {
        "prompts": [
            "72 ile 48 sayılarının en büyük ortak böleni (EBOB) kaçtır?",
            "$x^8$ ve $x^7$ değişkenlerinin en küçük ortak üssü hangisidir?",
            "Ortak çarpan $24x^7$ olduğunda parantez içi $(3x - 2)$ kalır. O halde $c = 24$ ve $k = 7$ ise $c + k$ kaçtır?"
        ],
        "distractors": {
            "A": "Katsayı olarak 24 yerine 12 aldın ($12+7=19$). Oysa 72 ve 48'in en büyük ortak böleni 24'tür.",
            "B": "Sadece katsayı $c=24$'ü işaretledin, soru senden $c+k$ toplamını istiyor!"
        }
    },
    (3, 3): {
        "prompts": [
            "Payı en küçük kuvvet olan $3^{x+2}$ parantezine al: $3^{x+2}(3^2 - 1)$. Bu sayı kaçtır?",
            "Paydayı en küçük kuvvet olan $3^{x+1}$ parantezine al: $3^{x+1}(3 + 1)$. Bu sayı kaçtır?",
            "Pay $8 \\cdot 3^{x+2}$, payda $4 \\cdot 3^{x+1}$. Şimdi katsayıları birbirine, üslü ifadeleri de birbirine böl."
        ],
        "distractors": {
            "A": "Üslü ifadedeki 3 çarpanını unuttun ($8/4 = 2$). $3^{x+2} / 3^{x+1} = 3^1 = 3$ çarpanı da vardır!",
            "B": "Katsayılar oranını $(8/4 = 2)$ unutup sadece 3 buldun."
        }
    },
    (3, 4): {
        "prompts": [
            "Paydaki $9^{x+1} - 9^x$ ifadesini $9^x$ parantezine alırsan ne kalır? $9^x(9 - 1) = 8 \\cdot 9^x$.",
            "Paydadaki $3^{2x-1}$ ifadesini parçala: $3^{2x} \\cdot 3^{-1} = 9^x / 3$.",
            "Şimdi payı paydaya böl: $(8 \\cdot 9^x) / (9^x / 3)$. Ters çevirip çarparsan $9^x$'ler sadeleşir, geriye ne kalır?"
        ],
        "distractors": {
            "A": "Paydadaki 3 bölenini ters çevirip çarpmak yerine göz ardı ettin.",
            "C": "İşlem basamaklarında katsayı çarpımında hata yaptın ($8 \\cdot 3 = 24$)."
        }
    },
    (3, 5): {
        "prompts": [
            "Verilen fonksiyonda $f(x+3) = 2^{x+3}$ ve $f(x+1) = 2^{x+1}$ olur mu?",
            "Bu iki terimi $2^{x+1}$ parantezine alırsan: $2^{x+1}(2^2 - 1) = 3 \\cdot 2^{x+1}$.",
            "$3 \\cdot 2^{x+1} = 48$ ise her iki tarafı 3'e böl. $2^{x+1} = 16 = 2^4$ ise $x+1 = 4$ ve $x = ?$"
        ],
        "distractors": {
            "D": "$x+1 = 4$ denkleminde $x=3$ bulmak yerine doğrudan 4'ü işaretledin.",
            "B": "48'i 3'e bölerken 16 yerine 8 bulmuş olabilir misin?"
        }
    },
    (3, 6): {
        "prompts": [
            "Tüm sayıları en küçük üs olan $2^{19}$ tabanında ifade edebilir miyiz?",
            "$A = 2^{21} + 2^{20} = 2^{19}(2^2 + 2^1) = 2^{19}(4 + 2) = 6 \\cdot 2^{19}$.",
            "Şimdi katsayıları karşılaştır: $B = 3 \\cdot 2^{19}$, $C = 5 \\cdot 2^{19}$, $A = 6 \\cdot 2^{19}$. Küçükten büyüğe sırala."
        ],
        "distractors": {
            "B": "A sayısının katsayısını yanlış hesaplayarak C'den küçük zannettin.",
            "D": "Sıralamayı büyükten küçüğe yaptın, seçenekler küçükten büyüğedir."
        }
    },
    (3, 7): {
        "prompts": [
            "$4^6$ sayısını 2 tabanında yaz: $(2^2)^6 = 2^{12}$.",
            "10 tabanı oluşturmak için $2^{11} \\cdot 5^{11} = 10^{11}$ elde etmemiz gerekir. $2^{12}$'den bir 2 ayırırsan: $2 \\cdot (2^{11} \\cdot 5^{11}) = 2 \\cdot 10^{11}$.",
            "Şimdi topla: $2 \\cdot 10^{11} + 1 \\cdot 10^{11} = 3 \\cdot 10^{11}$. 3 rakamının arkasında 11 tane sıfır varsa bu sayı kaç basamaklıdır?"
        ],
        "distractors": {
            "B": "Sadece sıfır sayısını (11) işaretledin. En baştaki 3 rakamı da bir basamak oluşturur: $1 + 11 = 12$!",
            "D": "Basamak sayısını hesaplarken fazladan 1 ekledin."
        }
    },
    (3, 8): {
        "prompts": [
            "Sol taraftaki terimleri en küçük kuvvet olan $2^a$ parantezine al.",
            "Parantez içi: $2^a(2^2 + 2^1 + 1) = 2^a(4 + 2 + 1) = 7 \\cdot 2^a$.",
            "$7 \\cdot 2^a = 112$ denkleminde 112'yi 7'ye böl. $2^a = 16$ ise $a$ kaçtır?"
        ],
        "distractors": {
            "B": "$2^a = 16$ iken 2'nin küpü sanıp 3 dedin. $2^4 = 16$ olduğunu hatırla.",
            "D": "112'yi 7'ye bölerken 16 yerine 32 buldun."
        }
    },
    (3, 9): {
        "prompts": [
            "$6^{x+1} = 6 \\cdot 6^x = 6 \\cdot (2^x \\cdot 3^x) = 6mn$ olarak yazılabilir mi?",
            "İkinci terim: $2^{x+1} \\cdot 3^x = 2 \\cdot 2^x \\cdot 3^x = 2 \\cdot (2^x \\cdot 3^x) = 2mn$.",
            "Şimdi bu iki ifadeyi birbirinden çıkar: $6mn - 2mn$ kaç eder?"
        ],
        "distractors": {
            "A": "İlk terimin katsayısını 6 yerine 4 aldın ($4 - 2 = 2$). $6^{x+1} = 6^1 \\cdot 6^x$ olduğunu hatırla.",
            "C": "Çıkarma yapmayı unutup sadece birinci terimi aldın."
        }
    },
    (3, 10): {
        "prompts": [
            "Sol tarafı $3^x$ ortak parantezine al: $3^x(3 + 1) = 4 \\cdot 3^x$.",
            "$4 \\cdot 3^x \\le 108$ eşitsizliğinde her iki tarafı 4'e böl. $3^x \\le 27 = 3^3$ olduğuna göre $x \\le 3$ olur.",
            "Soru DOĞAL SAYILARIN toplamını istiyor. Doğal sayılar kaçtan başlar? 0 bir doğal sayı mıdır? $0 + 1 + 2 + 3$ toplamı kaçtır?"
        ],
        "distractors": {
            "A": "Sadece en büyük sayı olan 3'ü aldın. Soru bu sayıların toplamını soruyor!",
            "B": "0'ı dahil etmedin ama toplama etkisi olmasa da işlem hatası yaptın ($1+2+3 = 6$)."
        }
    },

    # Quiz 4
    (4, 1): {
        "prompts": [
            "Önce her iki kültürdeki bakteri adetlerini 2 tabanında yaz: $4^7 = (2^2)^7 = 2^{14}$ ve $2^{16}$.",
            "Toplam bakteri adedi: $2^{14} + 2^{16} = 2^{14}(1 + 2^2) = 5 \\cdot 2^{14}$ olur.",
            "Toplam kütle: $(5 \\cdot 2^{14}) \\cdot 10^{-14}$. $10^{-14} = 2^{-14} \\cdot 5^{-14}$ olduğuna göre $2^{14}$ ile $2^{-14}$ sadeleşince ne kalır?"
        ],
        "distractors": {
            "B": "$5^1 \\cdot 5^{-14} = 5^{1-14} = 5^{-13}$ yerine $5^{-12}$ buldun. $1 - 14 = -13$ eder.",
            "A": "Kuvvetleri toplarken pozitif/negatif işaret hatası yaptın."
        }
    },
    (4, 2): {
        "prompts": [
            "Soru sonucu KİLE cinsinden istiyor. O halde tüm değerleri kileye çevirelim.",
            "$2^{10}$ Yük kaç kiledir? (1 Yük = 4 Kile $= 2^2$ Kile olduğuna göre $2^{10} \\cdot 2^2 = 2^{12}$ Kile).",
            "Satılan $2^{13}$ Şinik kaç kiledir? (1 Kile = 4 Şinik $= 2^2$ Şinik $\\implies 2^{13} / 2^2 = 2^{11}$ Kile). Kalan kile miktarını bulmak için $2^{12} - 2^{11}$ çıkar."
        ],
        "distractors": {
            "B": "Satılan kısmı 4'e bölmek yerine 2'ye böldün.",
            "D": "Çıkarma yaparken $2^{12} - 2^{11} = 2^{11}$ yerine $2^{12}$'ye yakın bir değer aldın."
        }
    },
    (4, 3): {
        "prompts": [
            "1 TB kaç MB eder? $1\\text{ TB} = 2^{10}\\text{ GB} = 2^{10} \\cdot 2^{10}\\text{ MB} = 2^{20}\\text{ MB}$.",
            "Dolu olan $2^{23}\\text{ MB}$ kaç TB'dir? $2^{23} / 2^{20} = 2^3\\text{ TB} = 8\\text{ TB}$.",
            "Kapasite $2^5 = 32\\text{ TB}$ idi. Boş alan: $32 - 8 = 24\\text{ TB}$. 24 sayısını üslü katsayı olarak $3 \\cdot 2^3$ biçiminde yazabilir misin?"
        ],
        "distractors": {
            "A": "Sadece dolu alanı hesaplayıp boş alan yerine 8 TB ($2^3$) işaretledin.",
            "B": "$32 - 8 = 24$ yerine 16 ($2^4$) hesapladın."
        }
    },
    (4, 4): {
        "prompts": [
            "Kağıt her katlandığında kalınlığı 2 katına çıkar. $n$. katlamadaki kalınlık: $2^{-4} \\cdot 2^n = 2^{n-4}\\text{ mm}$.",
            "8. katlamada kalınlık: $2^{8-4} = 2^4 = 16\\text{ mm}$.",
            "6. katlamada kalınlık: $2^{6-4} = 2^2 = 4\\text{ mm}$. İkisi arasındaki fark kaç mm'dir?"
        ],
        "distractors": {
            "A": "Farkı alırken üsleri çıkarmayı denedin ($2^4 - 2^2 = 2^2 = 4$ veya 8). Üslü sayılarda gerçek değerleri hesaplayıp çıkar.",
            "D": "Doğrudan 8. katlamadaki 16 mm değerini işaretledin, soru aradaki farkı istiyor."
        }
    },
    (4, 5): {
        "prompts": [
            "Payı yazalım: 3. ve 4. adımda oluşan dallar: $3^3 + 3^4 = 3^3(1 + 3) = 4 \\cdot 3^3$.",
            "Paydayı yazalım: 1. ve 2. adımda oluşan dallar: $3^1 + 3^2 = 3(1 + 3) = 4 \\cdot 3^1$.",
            "Bu iki ifadeyi birbirine oranla: $(4 \\cdot 3^3) / (4 \\cdot 3^1)$. 4'ler sadeleşirse geriye ne kalır?"
        ],
        "distractors": {
            "A": "Oranlama yaparken $3^3 / 3 = 3^2 = 9$ yerine 3 buldun.",
            "E": "Tüm adımları toplayıp gereksiz büyük bir sayı buldun."
        }
    },
    (4, 6): {
        "prompts": [
            "Sol kefenin toplam kütlesi: $6 \\cdot 4^5$. $4^5 = (2^2)^5 = 2^{10}$ olduğuna göre kütle $6 \\cdot 2^{10}\\text{ gram}$ olur.",
            "$6 \\cdot 2^{10}$ ifadesini $2^9$ cinsinden yaz: $6 \\cdot 2^1 \\cdot 2^9 = 12 \\cdot 2^9\\text{ gram}$.",
            "Sağ kefedeki her mavi cisim $2^9\\text{ gram}$ olduğuna göre sol kefeyi dengelemek için bunlardan kaç tane gerekir?"
        ],
        "distractors": {
            "A": "Sol kefedeki 6 katsayısını $2^{10}$'dan gelen 2 ile çarpmayı unutup 6 dedin.",
            "D": "Taban dönüştürmede işlem hatası yaptın."
        }
    },
    (4, 7): {
        "prompts": [
            "İki depodaki su farkını bulalım: $3^8 - 3^7$. $3^7$ parantezine alırsan $3^7(3 - 1) = 2 \\cdot 3^7$ litre fark vardır.",
            "Kritik düşünme: Eğer farkın tamamını ($2 \\cdot 3^7$) aktarırsan bu kez B deposu A'dan çok daha fazla olmaz mı?",
            "Eşitliği sağlamak için aradaki farkın YARISINI aktarmalısın: $(2 \\cdot 3^7) / 2$ kaç eder?"
        ],
        "distractors": {
            "D": "Farkın tamamını aktarmayı düşündün ($2 \\cdot 3^7$). Bu durumda B deposu fazla hale gelir, farkın yarısı aktarılmalıdır!",
            "E": "A deposunun yarısını aktarmayı denedin."
        }
    },
    (4, 8): {
        "prompts": [
            "Başlangıçtaki bakteri sayısını 2 tabanında yaz: $8^6 = (2^3)^6 = 2^{18}$.",
            "Bakterilerin $3/4$'ü öldüğüne göre ölen bakteri sayısı: $2^{18} \\cdot \\frac{3}{4}$ olur.",
            "4 yerine $2^2$ yazarsan: $2^{18} \\cdot 3 \\cdot 2^{-2} = 3 \\cdot 2^{18-2}$. Sonuç ne olur?"
        ],
        "distractors": {
            "A": "Hayatta kalan bakteri sayısını ($1/4 = 2^{16}$) işaretledin! Soru senden YOK OLAN (ölen) bakteri sayısını istiyor.",
            "D": "Üs çıkarma işleminde hata yaptın ($18 - 2 = 16$)."
        }
    },
    (4, 9): {
        "prompts": [
            "Algoritmanın hesapladığı $2^{x+3} - 2^{x+1}$ ifadesini $2^{x+1}$ parantezine al.",
            "$2^{x+1}(2^2 - 1) = 3 \\cdot 2^{x+1}$ olur. Bu sonuç 192'ye eşitmiş.",
            "$3 \\cdot 2^{x+1} = 192 \\implies 2^{x+1} = 64$. 64 sayısı 2'nin 6. kuvvetidir ($2^6$). $x+1 = 6$ ise $x$ kaçtır?"
        ],
        "distractors": {
            "D": "$x+1 = 6$ denkleminde $x=5$ bulmak yerine doğrudan 6 işaretledin.",
            "B": "192'yi 3'e bölerken 64 yerine 32 buldun."
        }
    },
    (4, 10): {
        "prompts": [
            "İfadeyi ikişer ikişer domino şeklinde topla: En soldaki $2^4 + 2^4$ neye eşittir?",
            "$2 \\cdot 2^4 = 2^5$ buldun. Şimdi yanındaki $2^5$ ile topla: $2^5 + 2^5 = 2^6$ eder.",
            "Bu zincir sağa doğru ilerlerken her adımda üs 1 artar. En son $2^{10} + 2^{10}$ toplandığında sonuç ne olur?"
        ],
        "distractors": {
            "A": "En sondaki terim $2^{10}$ olduğu için sonucun da $2^{10}$ olacağını sandın.",
            "C": "Adım sayısını fazla sayarak $2^{12}$ buldun."
        }
    }
}

full_socratic_questions = []
global_id = 1

for quiz in quizzes:
    test_no = int(quiz["testNo"])
    for q in quiz["questions"]:
        q_num = q["num"]
        ext = socratic_extensions.get((test_no, q_num), {
            "prompts": [
                f"Soru kökünü ve verilen üslü ifadeleri incele: Bu ifadede ortak bir çarpan parantezine alma imkanı görüyor musun?",
                f"Katsayıları toplama/çıkarma işlemine dikkat et: Ortak üssün katsayısı nedir?",
                f"Tabanlar ve üsler arasındaki ilişkiyi kurarak cevaba ulaşmayı dene."
            ],
            "distractors": {}
        })
        
        item = {
            "id": f"q-{global_id}",
            "globalIndex": global_id,
            "testId": quiz["id"],
            "testNo": quiz["testNo"],
            "testTitle": quiz["title"],
            "testBadge": quiz["badge"],
            "questionNo": q_num,
            "text": q["text"],
            "options": q["options"],
            "correctAnswer": q["correct"],
            "trap": q["trap"],
            "hint": q["hint"],
            "socraticPrompts": ext["prompts"],
            "distractors": ext.get("distractors", {})
        }
        full_socratic_questions.append(item)
        global_id += 1

output_js = f"""// 4. Bölüm Sokratik Pekiştirme & Mobil Öğrenme Veri Seti (40 Soru)
// Hiçbir sokratik aşamada doğrudan cevap verilmez; öğrenciye düşünme soruları yöneltilir.
window.SOCRATIC_QUESTIONS = {json.dumps(full_socratic_questions, ensure_ascii=False, indent=2)};
"""

target_file = 'sokratik_mobil/questions_data.js'
with open(target_file, 'w', encoding='utf-8') as f:
    f.write(output_js)

print(f"Generated {len(full_socratic_questions)} Socratic questions in {target_file}")
