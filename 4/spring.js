document.addEventListener('DOMContentLoaded', () => {
    // --- Sabitler ---
    // Ses dosyaları (CORS sorunlarını önlemek için projeye yerel mp3 ekleyin: click.mp3, start.mp3)
    const CLICK_SOUND_SRC = 'click.mp3';
    const START_SOUND_SRC = 'start.mp3';
    const DURATION = 12; // toplam animasyon süresi (0→12)
    // Grafik gösterim aralığı (tüm süre 0-12, üç periyot)
    const GRAPH_START = 0;
    const GRAPH_END = 12; // artık tüm kritik noktalar gösterilecek
    const FPS_HINT = 60;
    const FORMAT = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

    // Model: s(t)=8·cos( (π/2) t )  (Periyot 4) — faz yok, maksimum/minimumlar kafes noktaları
    const A0 = 8;
    const OMEGA = Math.PI / 2; // π/2 (T=4)
    // Faz kaldırıldı (PHASE=0)
    const OFFSET = 0;

    // DOM Referansları
    const pages = {
        intro: document.getElementById('spring-intro-page'),
        sim: document.getElementById('spring-simulation-page'),
        exam: document.getElementById('spring-exam-page'),
        aiEval: document.getElementById('spring-ai-eval-page')
    };
    const startBtn = document.getElementById('spring-start');
    const simStartBtn = document.getElementById('spring-sim-start');
    const toExamBtn = document.getElementById('spring-to-exam');
    const toExamBtnBottom = document.getElementById('spring-to-exam-bottom');
    const restartBtns = document.querySelectorAll('[data-spring-restart]');
    const submitExamBtn = document.getElementById('spring-submit-exam');

    const animCanvas = document.getElementById('spring-anim-canvas');
    const graphCanvas = document.getElementById('spring-graph-canvas');
    const gctx = graphCanvas.getContext('2d');
    const actx = animCanvas.getContext('2d');

    // Exam form
    const solutionOverlay = document.getElementById('spring-solution-overlay');
    const solTitle = document.getElementById('spring-sol-title');
    const solBody = document.getElementById('spring-sol-body');
    const solPrev = document.getElementById('spring-sol-prev');
    const solNext = document.getElementById('spring-sol-next');
    const viewSolutionsBtnAI = document.getElementById('spring-view-solutions-btn');

    // Çözüm içerikleri
    const solutionTexts = {
        1: 'Her x değeri için tek bir y değeri var; düşey doğru testi geçer ⇒ fonksiyon.',
    2: 'Kökler: 1,3,5,7,9,11.',
        3: 'Tanım: [0,12]. Görüntü: [-8,8].',
    4: 'Maksimum değer 8, minimum değer -8.',
    5: 'Artan aralıkların birleşimi: [2,4]∪[6,8]∪[10,12]. Azalan aralıkların birleşimi: [0,2]∪[4,6]∪[8,10].',
        6: 'Pozitif aralıklar: (0,1)∪(3,5)∪(7,9)∪(11,12). Negatif aralıklar: (1,3)∪(5,7)∪(9,11).',
        7: 'Bire bir değil; aynı y değeri birden fazla x için geçerli (ör: y=8 için x=0,4,8...).'
    };
    let currentSolution = 1; const maxSolution = 7; let solutionsUnlocked = false;
    let examLocked = false; // Değerlendirmeden sonra tekrar çözmeyi engelle
    let pathPoints = []; // Çizilen (t,y) noktaları
    let animationFinished = false;

    // Sayfa gösterme yardımcı fonksiyonu (tek merkez)
    function showPage(id){
        Object.values(pages).forEach(p=>p && p.classList.remove('active'));
        if(pages[id]) pages[id].classList.add('active');
        if(id==='exam'){
            if(examLocked) lockExamFields();
            // Sınava dönüldüğünde değerlendirme sonrası simülasyona dön butonunu gizle
            const examRestartBtns = document.querySelectorAll('#spring-exam-page [data-spring-restart]');
            examRestartBtns.forEach(btn=>{
                btn.style.display = examLocked ? 'none' : '';
            });
        }
    }
    window.springPages = { show: showPage };

    // Boyutlandırma (doğru şekilde)
    function resizeCanvases(){
        [graphCanvas, animCanvas].forEach(c=>{
            const dpr = window.devicePixelRatio || 1;
            const rect = c.getBoundingClientRect();
            c.width = rect.width * dpr; c.height = rect.height * dpr;
            const ctx = c.getContext('2d');
            ctx.setTransform(1,0,0,1,0,0);
            ctx.scale(dpr,dpr);
        });
    redrawGraph();
    redrawAnimation();
    }
    window.addEventListener('resize', ()=>{ if(pages.sim.classList.contains('active')) resizeCanvases(); });

    // Grafik eksenleri
    const padding = {top:40,right:40,bottom:50,left:60};
    function scaleX(t){ return padding.left + ((t - GRAPH_START) / (GRAPH_END - GRAPH_START)) * (graphCanvas.clientWidth - padding.left - padding.right); }
    function scaleY(x){ const range= A0*1.2; return graphCanvas.clientHeight - padding.bottom - ((x + range)/(2*range)) * (graphCanvas.clientHeight - padding.top - padding.bottom); }

    function drawAxes(){
        gctx.clearRect(0,0,graphCanvas.width,graphCanvas.height);
        gctx.font='13px Segoe UI, Tahoma, sans-serif';
        gctx.fillStyle='#222'; gctx.strokeStyle='#222'; gctx.lineWidth=2;
        const originX = scaleX(0); const originY = scaleY(0);
        // X ekseni
        gctx.beginPath(); gctx.moveTo(padding.left, originY);
        drawArrow(gctx, padding.left, originY, graphCanvas.clientWidth - padding.right, originY);
        gctx.stroke();
        // Y ekseni
        gctx.beginPath(); gctx.moveTo(originX, graphCanvas.clientHeight - padding.bottom);
        drawArrow(gctx, originX, graphCanvas.clientHeight - padding.bottom, originX, padding.top); // üst ok
        gctx.stroke();
        // Alt uç için aşağı ok başı
        gctx.beginPath();
        const head=10; const ang=Math.PI/2; const bx=originX; const by=graphCanvas.clientHeight - padding.bottom;
        gctx.moveTo(bx, by);
        gctx.lineTo(bx - head*Math.cos(ang - Math.PI/6), by - head*Math.sin(ang - Math.PI/6));
        gctx.moveTo(bx, by);
        gctx.lineTo(bx - head*Math.cos(ang + Math.PI/6), by - head*Math.sin(ang + Math.PI/6));
        gctx.stroke();
    // Etiketler (Orijin yeniden gösterildi)
    gctx.textAlign='right'; gctx.textBaseline='top';
    gctx.fillText('O', originX-12, originY+4); // hafif sola/aşağı kaydırılmış görünür konum
    // X etiketi biraz daha aşağı
    gctx.textAlign='right'; gctx.fillText('x', graphCanvas.clientWidth - padding.right, originY+16);
    // Y etiketi biraz daha yukarı (ekran koordinatlarında yukarı = daha küçük y)
    gctx.textAlign='left'; gctx.textBaseline='top'; gctx.fillText('y', originX+8, padding.top-20);
        // Kafes
        gctx.save();
    for(let t=GRAPH_START;t<=GRAPH_END;t+=1){ const x=scaleX(t); gctx.beginPath(); gctx.strokeStyle= t%2===0?'#d0d0d0':'#eeeeee'; gctx.lineWidth=t%2===0?1.2:1; gctx.moveTo(x,padding.top-5); gctx.lineTo(x,graphCanvas.clientHeight - padding.bottom+5); gctx.stroke(); }
        for(let y=-A0;y<=A0;y+=2){ const yy=scaleY(y); gctx.beginPath(); gctx.strokeStyle= y%4===0?'#d0d0d0':'#f0f0f0'; gctx.lineWidth= y%4===0?1.2:1; gctx.moveTo(padding.left-5,yy); gctx.lineTo(graphCanvas.clientWidth - padding.right+5, yy); gctx.stroke(); }
        gctx.restore();
        // Sayı etiketleri
        gctx.textAlign='center'; gctx.textBaseline='top';
    for(let t=GRAPH_START;t<=GRAPH_END;t+=1){ if(t===0) continue; gctx.fillText(FORMAT.format(t), scaleX(t), originY+6); }
        gctx.textAlign='right'; gctx.textBaseline='middle';
        for(let y=-A0; y<=A0; y+=4){ if(y===0) continue; gctx.fillText(FORMAT.format(y), originX-8, scaleY(y)); }
    // Kritik noktalar animasyon bitiminde çizilecek
    }

    function drawCriticalPoints(){
        const maxima=[0,4,8,12];
        const minima=[2,6,10];
        gctx.save();
        gctx.lineWidth=2;
        gctx.font='11px Segoe UI, Tahoma, sans-serif';
        gctx.textAlign='center';
        const placed=[]; // {x,y,w,h}
        function placeLabel(txt,cx,baseY,preferAbove){
            const pad=2; let offset = preferAbove?-10:14; let attempts=0; let y=baseY+(preferAbove? -10:14);
            // basit çakışma önleme: dikey kaydır
            while(attempts<10){
                const metrics=gctx.measureText(txt); const w=metrics.width; const h=12; const box={x:cx-w/2,y:y-h/2,w:w,h:h};
                if(!placed.some(p=> !(box.x>p.x+p.w || box.x+box.w<p.x || box.y>p.y+p.h || box.y+box.h<p.y))){
                    placed.push(box); gctx.fillText(txt,cx,y); return; }
                y += (preferAbove?-1:1)* (h+pad); attempts++;
            }
            gctx.fillText(txt,cx,y); // vazgeç, yine yaz
        }
        // Maksimumlar
        maxima.forEach(t=>{
            let x=scaleX(t), y=scaleY(A0);
            gctx.fillStyle='#1b5e20';
            gctx.beginPath(); gctx.arc(x,y,5,0,Math.PI*2); gctx.fill();
            // (0,8) etiketi eksenle çakışmasın diye biraz sağa kaydır
            const labelX = (t===0) ? x + 18 : x; // 18px sağa
            placeLabel(`(${t},${FORMAT.format(A0)})`, labelX, y, true);
        });
        // Minimumlar
        minima.forEach(t=>{
            const x=scaleX(t), y=scaleY(-A0);
            gctx.fillStyle='#0d47a1';
            gctx.beginPath(); gctx.arc(x,y,5,0,Math.PI*2); gctx.fill();
            placeLabel(`(${t},${FORMAT.format(-A0)})`, x, y, false);
        });
        // X ekseni kesişimleri (kökler)
        const zeros=[1,3,5,7,9,11];
        zeros.forEach(t=>{
            const x=scaleX(t), y=scaleY(0);
            gctx.fillStyle='#444';
            gctx.beginPath();
            gctx.arc(x,y,3,0,Math.PI*2);
            gctx.fill();
        });
        gctx.restore();
    }

    function drawArrow(ctx,x1,y1,x2,y2){
        const head=10; const dx=x2-x1, dy=y2-y1, ang=Math.atan2(dy,dx);
        ctx.lineTo(x2,y2);
        ctx.lineTo(x2 - head*Math.cos(ang-Math.PI/6), y2 - head*Math.sin(ang-Math.PI/6));
        ctx.moveTo(x2,y2);
        ctx.lineTo(x2 - head*Math.cos(ang+Math.PI/6), y2 - head*Math.sin(ang+Math.PI/6));
    }

    // Simülasyon
    let startTime=null, rafId=null, lastT=0;
    let pathStarted=false;

    function displacement(t){ return A0 * Math.cos(OMEGA*t) + OFFSET; }

    function drawAnimation(x,t){
        actx.clearRect(0,0,animCanvas.width,animCanvas.height);
        const w=animCanvas.clientWidth, h=animCanvas.clientHeight;
        const springTop = 40;
        const anchorX = w/2;
        const restLength = h*0.35;
        const pixScale = (h*0.25)/A0; // amplitude ölçeği
        const equilibriumMassY = springTop + restLength; // kütlenin denge alt kenarı (displacement=0 iken massY)
        const massY = equilibriumMassY + displacement(t)*pixScale; // alt kenar
        const massW=90, massH=50;
        const massTop = massY - massH;
        const eqCenterY = equilibriumMassY - massH/2; // denge konum çizgisi (kütle merkezine denk)
        // Yay çizimi (basit sinus kıvrımlı)
        const coils = 18; const amp = 14; const seg = (massY - springTop - 50)/coils;
        actx.lineWidth=3; actx.strokeStyle='#444'; actx.beginPath(); actx.moveTo(anchorX, springTop);
        for(let i=0;i<=coils;i++){
            const y = springTop + i*seg;
            const phase = i%2===0?1:-1;
            actx.lineTo(anchorX + phase*amp, y);
        }
        actx.lineTo(anchorX, massY-50);
        actx.stroke();
        // Denge çizgisi
        actx.save();
        actx.setLineDash([6,6]);
        actx.strokeStyle='#666';
        actx.beginPath(); actx.moveTo(anchorX - 160, eqCenterY); actx.lineTo(anchorX + 160, eqCenterY); actx.stroke();
        actx.setLineDash([]);
    actx.fillStyle='#222'; actx.font='12px Segoe UI, Tahoma, sans-serif';
    actx.textAlign='left';
    // "Denge" etiketi sol kenara taşındı (tüm ekran boyutlarında sabit)
    actx.fillText('Denge', 12, eqCenterY - 10);
        actx.restore();
        // Kütle
        actx.fillStyle='#ffbf1f'; actx.strokeStyle='#aa7d00'; actx.lineWidth=2.5;
        actx.beginPath(); actx.roundRect(anchorX-massW/2, massTop, massW, massH, 12); actx.fill(); actx.stroke();
        actx.fillStyle='#222'; actx.font='14px Segoe UI, Tahoma, sans-serif'; actx.textAlign='center'; actx.fillText('m', anchorX, massTop+massH/2+5);
        // Deplasman oku (denge merkezinden mevcut merkez)
        const currentCenterY = massTop + massH/2;
        actx.strokeStyle='#e74c3c'; actx.fillStyle='#e74c3c'; actx.lineWidth=2;
        actx.beginPath(); actx.moveTo(anchorX - massW/2 - 30, eqCenterY);
        actx.lineTo(anchorX - massW/2 - 30, currentCenterY);
        // ok başları
        const arrow = (y1,y2)=>{
            const dir = Math.sign(y2-y1)||1; const head=8;
            actx.lineTo(anchorX - massW/2 - 34, y2 - dir*head);
            actx.moveTo(anchorX - massW/2 - 30, y2);
        };
        actx.stroke();
    // Küçük etiket (fonksiyon f(x))
    actx.fillStyle='#e74c3c'; actx.font='11px Segoe UI, Tahoma, sans-serif'; actx.save(); actx.translate(anchorX - massW/2 - 45, (eqCenterY+currentCenterY)/2); actx.rotate(-Math.PI/2); actx.textAlign='center'; actx.fillText('f(x)',0,0); actx.restore();
    // Bilgi paneli (x zamanı, y konumu)
    actx.fillStyle='rgba(0,0,0,0.6)'; actx.fillRect(12,12,150,58);
    actx.fillStyle='#fff'; actx.textAlign='left'; actx.font='13px Segoe UI, Tahoma, sans-serif';
	actx.fillText('x: '+FORMAT.format(t), 24,34);
	actx.fillText('y: '+FORMAT.format(displacement(t)), 24,56);
    }

    function step(timestamp){
        if(!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime)/1000; // s
        const t = Math.min(elapsed, DURATION);
        const x = displacement(t);
        // Grafik çizgisi
        if(!pathStarted){
            gctx.beginPath();
            gctx.lineWidth=2.4; gctx.strokeStyle='#e74c3c';
            gctx.moveTo(scaleX(GRAPH_START), scaleY(displacement(GRAPH_START)));
            pathStarted=true; lastT=0;
        pathPoints = [[GRAPH_START, displacement(GRAPH_START)]];
        }
        if(t >= lastT + 1/FPS_HINT || t===0){
            const from = lastT; const to = t; const sub=6;
            for(let s=1;s<=sub;s++){
                const tt = from + (to-from)*(s/sub);
                if(tt <= GRAPH_END){
                    gctx.lineTo(scaleX(tt), scaleY(displacement(tt)));
            pathPoints.push([tt, displacement(tt)]);
                }
            }
            gctx.stroke();
            lastT = t;
        }
        drawAnimation(x,t);
        if(t < DURATION){
            rafId = requestAnimationFrame(step);
        } else {
            // Bitti
            toExamBtn.disabled = false; toExamBtn.classList.add('ready');
            toExamBtn.textContent = 'Sorulara Geç';
            if(toExamBtnBottom){
                toExamBtnBottom.disabled = false;
                toExamBtnBottom.classList.add('ready');
                toExamBtnBottom.textContent = 'Sorulara Geç';
            }
            drawCriticalPoints(); // Kritik noktalar animasyon bitince gösterilecek
        animationFinished = true;
            // Referans görüntü üret
            try{
                const refImg=document.getElementById('spring-graph-ref-img');
                if(refImg){
                    refImg.src=graphCanvas.toDataURL('image/png');
                    refImg.style.display='block';
                    const ph=document.getElementById('spring-ref-placeholder'); if(ph) ph.style.display='none';
                }
            }catch(e){ /* sessiz */ }
        }
    }

    function startSimulation(){
        cancelAnimationFrame(rafId); startTime=null; lastT=0; pathStarted=false; pathPoints=[]; animationFinished=false; resizeCanvases();
        toExamBtn.disabled = true; toExamBtn.classList.remove('ready');
        toExamBtn.textContent = 'Simülasyon Devam Ediyor';
        if(toExamBtnBottom){
            toExamBtnBottom.disabled = true;
            toExamBtnBottom.classList.remove('ready');
            toExamBtnBottom.textContent = 'Simülasyon Devam Ediyor';
        }
        rafId = requestAnimationFrame(step);
    }

    function redrawGraph(){
        drawAxes();
        if(pathPoints.length>1){
            gctx.beginPath();
            gctx.lineWidth=2.4; gctx.strokeStyle='#e74c3c';
            gctx.moveTo(scaleX(pathPoints[0][0]), scaleY(pathPoints[0][1]));
            for(let i=1;i<pathPoints.length;i++){
                const [tt,yy]=pathPoints[i];
                gctx.lineTo(scaleX(tt), scaleY(yy));
            }
            gctx.stroke();
        }
        if(animationFinished) drawCriticalPoints();
    }

    function redrawAnimation(){
        const t = animationFinished? DURATION : lastT;
        if(isNaN(t)) return;
        drawAnimation(displacement(Math.min(t,DURATION)), Math.min(t,DURATION));
    }

    // Çözümler
    function openSolution(n){
        if(!solutionsUnlocked) return;
        currentSolution = Math.min(Math.max(n,1), maxSolution);
        solTitle.textContent = 'Soru '+currentSolution+' Çözümü';
        solBody.innerHTML = '<p>'+solutionTexts[currentSolution]+'</p>';
        solutionOverlay.style.display='flex';
        solPrev.disabled = currentSolution<=1;
        solNext.disabled = currentSolution>=maxSolution;
    }
    function closeSolution(){ solutionOverlay.style.display='none'; }
    solPrev.addEventListener('click',()=>openSolution(currentSolution-1));
    solNext.addEventListener('click',()=>openSolution(currentSolution+1));
    document.querySelectorAll('[data-spring-close-solution]').forEach(b=>b.addEventListener('click',closeSolution));
    document.addEventListener('keydown',e=>{ if(solutionOverlay.style.display==='flex'){ if(e.key==='Escape') closeSolution(); if(e.key==='ArrowRight') openSolution(currentSolution+1); if(e.key==='ArrowLeft') openSolution(currentSolution-1);} });
    document.querySelectorAll('[data-sol]').forEach(btn=>btn.addEventListener('click',()=>openSolution(parseInt(btn.dataset.sol,10))));
    // Global erişim (HTML onclick için)
    window.springSolutions={ open: openSolution, close: closeSolution };

    function collectResponses(){
    const fields=['q1a','q1b','q2zeros','q3a_1','q3a_2','q3b_1','q3b_2','q4a','q4b','q5inc','q5dec','q6pos','q6neg','q7a','q7b'];
    const raw={}; fields.forEach(id=>{ const el=document.getElementById(id); raw[id]=el?el.value.trim():''; });
    return {
        'Soru-1': { cevap: raw.q1a, gerekce: raw.q1b },
        'Soru-2': { kokler: raw.q2zeros },
        'Soru-3': { tanim_bas: raw.q3a_1, tanim_bit: raw.q3a_2, goruntu_bas: raw.q3b_1, goruntu_bit: raw.q3b_2 },
        'Soru-4': { maks: raw.q4a, min: raw.q4b },
        'Soru-5': { artan_birlesim: raw.q5inc, azalan_birlesim: raw.q5dec },
        'Soru-6': { pozitif: raw.q6pos, negatif: raw.q6neg },
        'Soru-7': { cevap: raw.q7a, gerekce: raw.q7b }
    };
    }

    // Yerel anlık kısmi puanlama (Soru 2 kökler) – kullanıcı yazarken geri bildirim
    (function setupLocalZeroFeedback(){
        const input=document.getElementById('q2zeros');
        const box=document.getElementById('q2-feedback');
        if(!input||!box) return;
        const correct=[1,3,5,7,9,11];
        function evalZeros(){
            const val=input.value.trim();
            if(!val){ box.textContent=''; return; }
            // Virgül, noktalı virgül veya boşluk ayırıcı kabul et
            const parts= val.split(/[;,\s]+/).map(s=>s.replace(/[^0-9.]/g,'')).filter(Boolean).map(Number);
            const unique=[...new Set(parts)].sort((a,b)=>a-b);
            let correctCount=0; unique.forEach(x=>{ if(correct.includes(x)) correctCount++; });
            const orderOk = unique.length===correct.length && unique.every((v,i)=>v===correct[i]);
            const score = (correctCount/6)*6; // 0-6 skalasında ham
            const pct = (correctCount/6)*100;
            box.innerHTML = `Doğru kök sayısı: <strong>${correctCount}/6</strong> (${pct.toFixed(0)}%)` + (orderOk? ' – Sıra doğru 👍':'');
        }
        input.addEventListener('input', evalZeros);
    })();

    // Soru 5 artan/azalan aralık birleşimleri canlı doğrulama
    (function setupQ5IntervalFeedback(){
        const inc=document.getElementById('q5inc');
        const dec=document.getElementById('q5dec');
        const box=document.getElementById('q5-feedback');
        if(!inc||!dec||!box) return;
    const correctInc=['[2,4]','[6,8]','[10,12]'];
    const correctDec=['[0,2]','[4,6]','[8,10]'];
        function parseUnion(str){
            return str.split(/∪/).map(s=>s.trim()).filter(Boolean);
        }
        function normInterval(i){
            return i.replace(/\s+/g,'');
        }
        function score(list, correct){
            const set=new Set(list.map(normInterval));
            let hit=0; correct.forEach(c=>{ if(set.has(c)) hit++; });
            return {hit,total:correct.length,all: list.map(normInterval)};
        }
        function validate(){
            const incList=parseUnion(inc.value);
            const decList=parseUnion(dec.value);
            const sInc=score(incList,correctInc);
            const sDec=score(decList,correctDec);
            const orderIncOk = incList.map(normInterval).join(',')===correctInc.join(',');
            const orderDecOk = decList.map(normInterval).join(',')===correctDec.join(',');
            box.innerHTML = `Artan: ${sInc.hit}/${sInc.total}` + (orderIncOk?' (sıra doğru)':'') +
                ' | Azalan: '+`${sDec.hit}/${sDec.total}` + (orderDecOk?' (sıra doğru)':'');
        }
        inc.addEventListener('input', validate);
        dec.addEventListener('input', validate);
    })();

    // Soru 6 pozitif/negatif aralık birleşimleri canlı doğrulama
    (function setupQ6SignFeedback(){
        const pos=document.getElementById('q6pos');
        const neg=document.getElementById('q6neg');
        if(!pos||!neg) return;
        // Kosinüs pozitif: (0,1) (3,5) (7,9) (11,12); negatif: (1,3) (5,7) (9,11)
        const correctPos=['(0,1)','(3,5)','(7,9)','(11,12)'];
        const correctNeg=['(1,3)','(5,7)','(9,11)'];
        function parseUnion(str){ return str.split(/∪/).map(s=>s.trim()).filter(Boolean); }
        function norm(i){ return i.replace(/\s+/g,''); }
        function score(list, corr){ const set=new Set(list.map(norm)); let hit=0; corr.forEach(c=>{ if(set.has(c)) hit++; }); return {hit,total:corr.length}; }
        function validate(){
            const p=parseUnion(pos.value);
            const n=parseUnion(neg.value);
            const sp=score(p,correctPos); const sn=score(n,correctNeg);
            pos.title=`Pozitif doğru: ${sp.hit}/${sp.total}`;
            neg.title=`Negatif doğru: ${sn.hit}/${sn.total}`;
        }
        pos.addEventListener('input', validate);
        neg.addEventListener('input', validate);
    })();

    function buildAIScoringPrompt(data){
    return `YALNIZCA JSON FORMATINDA CEVAP VER. Açıklama metni YOK!\nPeriyodik bir fonksiyon sınavını puanla.\nModel ayrıntısı gösterilmiyor; x ∈ [0,12].\nDOĞRU CEVAPLAR (Toplam 25 puan): \nSoru-1: evet (düşey doğru testi) – 4 puan\nSoru-2: Kökler: 1,3,5,7,9,11 (kısmi puan) – 5 puan\nSoru-3: Tanım=[0,12], Görüntü=[-8,8] – 4 puan\nSoru-4: Maks=8, Min=-8 – 3 puan\nSoru-5: Artan: [2,4]∪[6,8]∪[10,12]; Azalan: [0,2]∪[4,6]∪[8,10] – 3 puan\nSoru-6: Pozitif: (0,1)∪(3,5)∪(7,9)∪(11,12); Negatif: (1,3)∪(5,7)∪(9,11) – 3 puan\nSoru-7: hayır (aynı y değeri farklı x'lerde) – 3 puan\nKISMİ PUAN: yaklaşık doğruluk oranlı (tam=1.0, çoğunluk=0.75, kısmen=0.5, az=0.25, yanlış=0). Üst sınırları aşma.\nJSON ŞEMA: {\"q1\":{\"puan\":0-4},\"q2\":{\"puan\":0-5},\"q3\":{\"puan\":0-4},\"q4\":{\"puan\":0-3},\"q5\":{\"puan\":0-3},\"q6\":{\"puan\":0-3},\"q7\":{\"puan\":0-3},\"toplam\":0-25}\nÖĞRENCİ YANITLARI: ${JSON.stringify(data)}\nJSON:`;
    }

    function callGemini(apiKey,prompt){
        const models=['gemini-2.0-flash','gemini-1.5-flash'];
        let lastErr=null;
        return (async ()=>{
            for(const m of models){
                try{
                    const res= await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+m+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','X-goog-api-key':apiKey},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
                    if(!res.ok){ lastErr=new Error(m+' HTTP '+res.status); continue; }
                    const js= await res.json();
                    const text = js?.candidates?.[0]?.content?.parts?.[0]?.text; if(text) return text; lastErr=new Error('Boş yanıt');
                }catch(e){ lastErr=e; }
            }
            throw lastErr||new Error('Model bulunamadı');
        })();
    }

    function parseAIJSON(raw){
        let c=raw.trim();
        if(c.startsWith('```json')) c=c.slice(7);
        if(c.startsWith('```')) c=c.slice(3);
        if(c.endsWith('```')) c=c.slice(0,-3);
        return JSON.parse(c.trim());
    }

    function updateScoreCard(score, grade, pct){
        const sEl=document.getElementById('spring-final-score');
        const pEl=document.getElementById('spring-final-percentage');
        const gEl=document.getElementById('spring-final-grade');
        if(score==null){ sEl.textContent='-- / 25'; pEl.textContent='--%'; gEl.textContent=grade||'Hata'; return; }
        sEl.textContent=score+' / 25'; pEl.textContent=pct.toFixed(0)+'%'; gEl.textContent=grade;
        const card=document.getElementById('spring-score-card');
        if(pct>=85) card.style.background='linear-gradient(135deg,#2e7d32,#4caf50)';
        else if(pct>=70) card.style.background='linear-gradient(135deg,#1976d2,#42a5f5)';
        else if(pct>=50) card.style.background='linear-gradient(135deg,#f57c00,#ffb74d)';
        else card.style.background='linear-gradient(135deg,#d32f2f,#f44336)';
        // LMS'ye gönder (asenkron, hata konsola yazılır)
        sendExamScoreToLMS({score, max:25, percentage:pct, grade});
    }

    // LMS puan gönderim fonksiyonu
    async function sendExamScoreToLMS(payload){
        try{
            const meta=document.querySelector('meta[name="lms-endpoint"]');
            const endpoint= meta ? meta.getAttribute('content') : null;
            if(!endpoint){ console.warn('[LMS] Uç nokta bulunamadı (meta[name="lms-endpoint"]).'); return; }
            const res= await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
                examId:'fonksiyon_tanimi_yay',
                timestamp: new Date().toISOString(),
                ...payload
            })});
            if(!res.ok){ console.warn('[LMS] Gönderim başarısız HTTP', res.status); return; }
            console.log('[LMS] Puan gönderildi');
        }catch(err){ console.warn('[LMS] Gönderim hatası:', err); }
    }

    function formatEval(parsed){
        const box=document.getElementById('spring-evaluation-content');
        let html='<h3 style="margin-top:0;">📊 Detaylı Değerlendirme</h3><div style="display:grid;gap:14px;">';
        const meta=[['q1','Fonksiyon Tanımı',4],['q2','Kökler',5],['q3','Tanım/Görüntü',4],['q4','Maks/Min',3],['q5','Artan/Azalan',3],['q6','Pozitif/Negatif',3],['q7','Bire Bir',3]];
            meta.forEach(([id,title,max])=>{ const d=parsed[id]||{}; const puan=Math.min(d.puan||0,max); const pct= (puan/max)*100; let color='#dc3545',icon='❌'; if(pct>=80){color='#2e7d32';icon='✅';} else if(pct>=60){color='#1976d2';icon='🔵';} else if(pct>=40){color='#ffc107';icon='⚠️';}
                html+=`<div style="background:#fff; border-radius:12px; padding:14px 16px; box-shadow:0 4px 14px -6px rgba(0,0,0,.15); border-left:5px solid ${color};"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;"><div><strong>${icon} ${title}</strong><div style=\"font-size:.7rem;opacity:.7;\">${d.durum||''}</div></div><div style="text-align:center;">${puan}/${max}<div style="font-size:.65rem;opacity:.7;">%${pct.toFixed(0)}</div></div></div><div style="margin-top:8px;font-size:.8rem;line-height:1.4;">${d['açıklama']||d.aciklama||''}</div></div>`;
        });
        html+='</div>';
        if(parsed['öneriler']||parsed.oneriler){ html+=`<div style="margin-top:24px; background:linear-gradient(135deg,#84fab0,#8fd3f4); padding:16px 18px; border-radius:14px;"><strong>💡 Öneriler:</strong> ${(parsed['öneriler']||parsed.oneriler)}</div>`; }
        box.innerHTML=html;
    }
        function formatEval(parsed, responses){
            const box=document.getElementById('spring-evaluation-content');
            let html='<h3 style="margin-top:0;">📊 Detaylı Değerlendirme</h3><div style="display:grid;gap:14px;">';
            const meta=[["q1","Fonksiyon Tanımı",4],["q2","Kökler",5],["q3","Tanım/Görüntü",4],["q4","Maks/Min",3],["q5","Artan/Azalan",3],["q6","Pozitif/Negatif",3],["q7","Bire Bir",3]];
                meta.forEach(([id,title,max])=>{ const d=parsed[id]||{}; const puan=Math.min(d.puan||0,max); const pct= (puan/max)*100; let color='#dc3545',icon='❌'; if(pct>=80){color='#2e7d32';icon='✅';} else if(pct>=60){color='#1976d2';icon='🔵';} else if(pct>=40){color='#ffc107';icon='⚠️';}
                    html+=`<div style="background:#fff; border-radius:12px; padding:14px 16px; box-shadow:0 4px 14px -6px rgba(0,0,0,.15); border-left:5px solid ${color};"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;"><div><strong>${icon} ${title}</strong><div style=\"font-size:.7rem;opacity:.7;\">${d.durum||''}</div></div><div style="text-align:center;">${puan}/${max}<div style="font-size:.65rem;opacity:.7;">%${pct.toFixed(0)}</div></div></div><div style="margin-top:8px;font-size:.8rem;line-height:1.4;">${d['açıklama']||d.aciklama||''}</div></div>`;
            });
            html+='</div>';
            // Ayrıntılı bloklar
            html+=buildDetailedBlocks(responses);
            if(parsed['öneriler']||parsed.oneriler){ html+=`<div style="margin-top:24px; background:linear-gradient(135deg,#84fab0,#8fd3f4); padding:16px 18px; border-radius:14px;"><strong>💡 Öneriler:</strong> ${(parsed['öneriler']||parsed.oneriler)}</div>`; }
            box.innerHTML=html;
        }

        function buildDetailedBlocks(resp){
            if(!resp) return '';
            const correct={
                q1:'evet',
                q2:[1,3,5,7,9,11],
                q3:{d:[0,12],r:[-8,8]},
                q4:{max:8,min:-8},
                q5:{inc:['[2,4]','[6,8]','[10,12]'],dec:['[0,2]','[4,6]','[8,10]']},
                q6:{pos:['(0,1)','(3,5)','(7,9)','(11,12)'],neg:['(1,3)','(5,7)','(9,11)']},
                q7:'hayır'
            };
            function parseUnion(s){return (s||'').split(/∪/).map(t=>t.trim()).filter(Boolean);}        
            const blocks=[];
            // Q1
            const u1=(resp['Soru-1']?.cevap||''); blocks.push(renderBlock('1. Soru','Öğrenci: '+u1,'Doğru: evet', u1.toLowerCase()==='evet'?'Tam doğru':'"evet" bekleniyordu'));
            // Q2
            const raw2=resp['Soru-2']?.kokler||''; const u2=raw2.split(/[;,\s]+/).filter(Boolean).map(Number); const uniq=[...new Set(u2)].sort((a,b)=>a-b); const miss=correct.q2.filter(z=>!uniq.includes(z)); const extra=uniq.filter(z=>!correct.q2.includes(z)); let exp2=''; if(miss.length) exp2+='Eksik: '+miss.join(', ')+' '; if(extra.length) exp2+='Fazla: '+extra.join(', '); blocks.push(renderBlock('2. Soru','Öğrenci: '+raw2,'Doğru: '+correct.q2.join(', '), exp2||'Tamamı doğru'));
            // Q3
            const r3=resp['Soru-3']; const dom=`[${r3?.tanim_bas||''},${r3?.tanim_bit||''}]`; const rng=`[${r3?.goruntu_bas||''},${r3?.goruntu_bit||''}]`; let exp3=''; if(dom!=='[0,12]') exp3+='Tanım yanlış. '; if(rng!=='[-8,8]') exp3+='Görüntü yanlış.'; blocks.push(renderBlock('3. Soru','Öğrenci: '+dom+' / '+rng,'Doğru: [0,12] / [-8,8]', exp3||'Tam doğru'));
            // Q4
            const r4=resp['Soru-4']; let exp4=''; if(r4?.maks!=='8') exp4+='Maks 8 olmalı. '; if(r4?.min!=='-8') exp4+='Min -8 olmalı.'; blocks.push(renderBlock('4. Soru','Öğrenci: Maks '+(r4?.maks||'')+' Min '+(r4?.min||''),'Doğru: Maks 8 Min -8', exp4||'Tam doğru'));
            // Q5
            const r5=resp['Soru-5']; const uInc=parseUnion(r5?.artan_birlesim); const uDec=parseUnion(r5?.azalan_birlesim); const missInc=correct.q5.inc.filter(x=>!uInc.includes(x)); const missDec=correct.q5.dec.filter(x=>!uDec.includes(x)); const extraInc=uInc.filter(x=>!correct.q5.inc.includes(x)); const extraDec=uDec.filter(x=>!correct.q5.dec.includes(x)); let exp5=''; if(missInc.length) exp5+='Artan eksik: '+missInc.join(', ')+' '; if(extraInc.length) exp5+='Artan fazla: '+extraInc.join(', ')+' '; if(missDec.length) exp5+='Azalan eksik: '+missDec.join(', ')+' '; if(extraDec.length) exp5+='Azalan fazla: '+extraDec.join(', '); blocks.push(renderBlock('5. Soru','Öğrenci: A:'+ (r5?.artan_birlesim||'')+' Z:'+ (r5?.azalan_birlesim||''),'Doğru A: '+correct.q5.inc.join('∪')+' Z: '+correct.q5.dec.join('∪'), exp5||'Tam doğru'));
            // Q6
            const r6=resp['Soru-6']; const uPos=parseUnion(r6?.pozitif); const uNeg=parseUnion(r6?.negatif); let exp6=''; const missPos=correct.q6.pos.filter(x=>!uPos.includes(x)); const missNeg=correct.q6.neg.filter(x=>!uNeg.includes(x)); const extraPos=uPos.filter(x=>!correct.q6.pos.includes(x)); const extraNeg=uNeg.filter(x=>!correct.q6.neg.includes(x)); if(missPos.length) exp6+='Pozitif eksik: '+missPos.join(', ')+' '; if(extraPos.length) exp6+='Pozitif fazla: '+extraPos.join(', ')+' '; if(missNeg.length) exp6+='Negatif eksik: '+missNeg.join(', ')+' '; if(extraNeg.length) exp6+='Negatif fazla: '+extraNeg.join(', '); blocks.push(renderBlock('6. Soru','Öğrenci: P:'+(r6?.pozitif||'')+' N:'+(r6?.negatif||''),'Doğru P: '+correct.q6.pos.join('∪')+' N: '+correct.q6.neg.join('∪'), exp6||'Tam doğru'));
            // Q7
            const r7=resp['Soru-7']; let exp7=''; if((r7?.cevap||'').toLowerCase()!=='hayır') exp7='Doğru cevap "hayır".'; blocks.push(renderBlock('7. Soru','Öğrenci: '+(r7?.cevap||'')+' '+(r7?.gerekce||''),'Doğru: hayır; tekrar eden y değerleri var.', exp7||'Tam doğru'));
            return '<h3 style="margin:26px 0 6px;">🧠 Ayrıntılı Açıklamalar</h3><div style="display:grid;gap:10px;">'+blocks.join('')+'</div>';
        }

    // HTML kaçış (eklenmemişti hata veriyordu)
    function escapeHtml(str){return (str||'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}

    function renderBlock(label, student, correct, issue){
            return `<div style="background:#fff;border:1px solid #e2e8f0;border-left:5px solid #0f62fe;padding:10px 14px 12px;border-radius:10px;font-size:.7rem;line-height:1.35;">`+
                   `<strong>${label}</strong><br><strong>Öğrenci:</strong> ${escapeHtml(student||'')}<br>`+
                   `<strong>Doğru:</strong> ${escapeHtml(correct)}<br>`+
                   (issue?`<strong style=\"color:#b00020;\">Hata:</strong> ${escapeHtml(issue)}`:'')+
                   `</div>`;
        }

    async function runAIEvaluation(){
        const evaluationContent=document.getElementById('spring-evaluation-content');
        const data=collectResponses();
        setTimeout(()=>{evaluationContent.innerHTML='<div style="text-align:center; padding:40px;">⏳ Değerlendiriliyor...</div>';},50);
        let key='AIzaSyCEhU3erLOAJB9cADTqaGanVidc2DRbhr8';
        try{
            const prompt=buildAIScoringPrompt(data);
            const raw=await callGemini(key,prompt);
            let parsed; try{ parsed=parseAIJSON(raw);}catch(e){ evaluationContent.innerHTML='<div style="background:#fff3cd;border:1px solid #ffc107;padding:18px;border-radius:12px;">Format dışı çıktı – manuel inceleyin.<pre style="white-space:pre-wrap;font-size:.7rem;">'+raw.replace(/</g,'&lt;')+'</pre></div>'; updateScoreCard(null,'Format Hatası'); return; }
            const total = typeof parsed.toplam==='number'?parsed.toplam:0; const pct = total/25*100; const grade='';
            updateScoreCard(total,grade,pct); // içinde LMS gönderimi tetiklenir
            formatEval(parsed, data); solutionsUnlocked=true; examLocked = true; document.body.classList.add('solutions-enabled'); if(viewSolutionsBtnAI) viewSolutionsBtnAI.style.display='inline-flex';
        }catch(err){ console.warn(err); evaluationContent.innerHTML='<div style="background:#f8d7da;border:1px solid #dc3545;padding:18px;border-radius:12px;">YZ puanlama hatası: '+(err.message||err)+'</div>'; updateScoreCard(null,'Değerlendirme Hatası'); }
    }

    function localScore(data){
        // Basit kural tabanlı puanlama
        const pts={q1:4,q2:4,q3:4,q4:4,q5:4,q6:3,q7:3,total:25};
        let total=0; const det={};
        det.q1= /\[?0\s*,?\s*12\]?/.test(data.sq1a)?pts.q1:0; total+=det.q1;
        det.q2= /8/.test(data.sq2a)?pts.q2:0; total+=det.q2;
        const q3aOk = /0/.test(data.sq3a); const q3bOk = /12/.test(data.sq3b); det.q3 = (q3aOk && q3bOk)?pts.q3: (q3aOk||q3bOk?Math.round(pts.q3/2):0); total+=det.q3;
    const perOk = /4/.test(data.sq4a); const ampOk = /8/.test(data.sq4b); det.q4 = (perOk&&ampOk)?pts.q4: (perOk||ampOk?Math.round(pts.q4/2):0); total+=det.q4;
    const maxOk = /8/.test(data.sq5a); const minOk = /-?8/.test(data.sq5b); det.q5=(maxOk&&minOk)?pts.q5:(maxOk||minOk?Math.round(pts.q5/2):0); total+=det.q5;
    const sOk = /sabit|tekrar|değer/i.test(data.sq6a+data.sq6b); const decOk = /sabit|tekrar|aynı/i.test(data.sq6b); det.q6=(sOk&&decOk)?pts.q6:(sOk||decOk?2:0); total+=det.q6;
        det.q7= /(hayır|degil|değil)/i.test(data.sq7a)?pts.q7:0; total+=det.q7;
        det.total=total; return det;
    }

    // Eski yerel değerlendirme kaldırıldı (AI tabanlı skor kullanılıyor)

    // Olaylar
    startBtn && startBtn.addEventListener('click', ()=>{ play(START_SOUND_SRC); window.springPages.show('sim'); startSimulation(); });
    simStartBtn && simStartBtn.addEventListener('click', ()=>{ window.springPages.show('sim'); startSimulation(); });
    toExamBtn.addEventListener('click', ()=>{ window.springPages.show('exam'); });
    if(toExamBtnBottom){
        toExamBtnBottom.addEventListener('click', ()=>{ window.springPages.show('exam'); });
    }
    submitExamBtn.addEventListener('click', ()=>{ window.springPages.show('aiEval'); setTimeout(runAIEvaluation, 1200); });
    restartBtns.forEach(b=>b.addEventListener('click', ()=>{ examLocked=false; unlockExamFields(); window.springPages.show('intro'); }));

    // Referans paneli toggle
    (function(){
        const btn=document.getElementById('spring-ref-toggle');
        const body=document.getElementById('spring-ref-body');
        if(!btn||!body) return;
        btn.addEventListener('click',()=>{
            const vis=body.style.display!=='none';
            body.style.display= vis?'none':'block';
            btn.textContent= vis?'Göster':'Gizle';
        });
    })();

    function lockExamFields(){
        const form = document.getElementById('spring-quiz-form');
        if(!form) return;
        form.querySelectorAll('input').forEach(inp=>{ inp.disabled = true; inp.classList.add('exam-locked'); });
        if(submitExamBtn){ submitExamBtn.disabled = true; submitExamBtn.textContent = 'Değerlendirme Tamamlandı'; }
        // Bilgilendirme notu ekle (bir kere)
        if(!document.getElementById('exam-locked-note')){
            const note=document.createElement('div');
            note.id='exam-locked-note';
            note.style.marginTop='14px';
            note.style.padding='12px 14px';
            note.style.background='#f1f5f9';
            note.style.border='1px solid #cbd5e1';
            note.style.borderRadius='10px';
            note.style.fontSize='.75rem';
            note.style.color='#334155';
            note.textContent='Değerlendirme yapıldı. Sorular kilitlendi.';
            form.appendChild(note);
        }
    }

    function unlockExamFields(){
        const form = document.getElementById('spring-quiz-form');
        if(!form) return;
        form.querySelectorAll('input').forEach(inp=>{ inp.disabled = false; inp.classList.remove('exam-locked'); });
        if(submitExamBtn){ submitExamBtn.disabled = false; submitExamBtn.textContent = 'Sınavı Bitir ve Puanla'; }
        const note=document.getElementById('exam-locked-note'); if(note) note.remove();
    }

    // Başlangıç
    resizeCanvases();
    window.springPages.show('intro');

    // Global sembol ekleme: son odaklanan inputa veya aynı soru içindeki ilk inputa ekler
    let lastFocusedInput=null;
    document.addEventListener('focusin', e=>{ if(e.target && e.target.tagName==='INPUT') lastFocusedInput=e.target; });
    document.addEventListener('click', e=>{
        const btn=e.target.closest('[data-insert-symbol]');
        if(!btn) return;
        const sym=btn.getAttribute('data-insert-symbol');
        let target=document.activeElement&&document.activeElement.tagName==='INPUT'?document.activeElement:lastFocusedInput;
        if(!target){ const qq=btn.closest('.quiz-question'); if(qq) target=qq.querySelector('input'); }
        if(!target) return;
        target.focus();
        const start=target.selectionStart??target.value.length; const end=target.selectionEnd??target.value.length;
        const val=target.value;
        target.value=val.slice(0,start)+sym+val.slice(end);
        const pos=start+sym.length; if(target.setSelectionRange) target.setSelectionRange(pos,pos);
        target.dispatchEvent(new Event('input',{bubbles:true}));
    });

    // Dinamik sembol paleti isteğe bağlıydı; kullanıcı talebiyle kaldırıldı.
});
