// スクロール時のフェードインアニメーション
document.addEventListener('DOMContentLoaded', () => {
    // アニメーション対象の要素を取得
    const fadeElements = document.querySelectorAll('.empathy, .philosophy, .services, .story, .cta');

    // Intersection Observer の設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);

    // 各要素を監視
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // スムーズスクロール（ボタンクリック時）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // # のみの場合はトップへスクロール
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            // 対象要素が存在する場合のみスクロール
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // プロフィール展開機能
    const aboutToggle = document.getElementById('about-toggle');
    const aboutExpanded = document.getElementById('about-expanded');

    if (aboutToggle && aboutExpanded) {
        aboutToggle.addEventListener('click', () => {
            const isExpanded = aboutToggle.getAttribute('aria-expanded') === 'true';

            if (isExpanded) {
                // 閉じる
                aboutToggle.setAttribute('aria-expanded', 'false');
                aboutExpanded.hidden = true;
                aboutToggle.innerHTML = 'プロフィールをもう少し読む <span class="arrow">↓</span>';
            } else {
                // 開く
                aboutToggle.setAttribute('aria-expanded', 'true');
                aboutExpanded.hidden = false;
                aboutToggle.innerHTML = '閉じる <span class="arrow">↑</span>';

                // スムーズにスクロール（展開したコンテンツの先頭へ）
                setTimeout(() => {
                    aboutExpanded.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 100);
            }
        });
    }

    // 共感セクション：1行ずつスクロールトリガー
    const empathyLines = document.querySelectorAll('.empathy-line');

    const empathyObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const empathyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                // 各行のインデックスを取得
                const index = Array.from(empathyLines).indexOf(entry.target);
                // 0.15s ずつ delay を付けて表示
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                // 一度表示したら監視を解除
                empathyObserver.unobserve(entry.target);
            }
        });
    }, empathyObserverOptions);

    // 各行を監視
    empathyLines.forEach(line => {
        empathyObserver.observe(line);
    });

    // 大切にしていること：3つの島を時間差で表示
    const philosophyItems = document.querySelectorAll('.philosophy-item');

    const philosophyObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const philosophyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                entry.target.classList.add('visible');
                // 一度表示したら監視を解除
                philosophyObserver.unobserve(entry.target);
            }
        });
    }, philosophyObserverOptions);

    // 各要素を監視
    philosophyItems.forEach(item => {
        philosophyObserver.observe(item);
    });

    // SP表示のみ：bridge-quote-lineとbridge-text-lineを1行ずつ右からスライドイン
    const bridgeQuoteLines = document.querySelectorAll('.bridge-quote-line, .bridge-text-line');

    if (bridgeQuoteLines.length > 0) {
        const bridgeObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const bridgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
                    // SP表示の場合のみアニメーション、PC表示は即座に表示
                    if (window.innerWidth <= 768) {
                        // 各行のインデックスを取得
                        const index = Array.from(bridgeQuoteLines).indexOf(entry.target);
                        // 0.4秒ずつ遅延して表示
                        setTimeout(() => {
                            entry.target.classList.add('is-visible');
                        }, index * 400);
                    } else {
                        // PC表示では即座に表示
                        entry.target.classList.add('is-visible');
                    }
                    // 一度表示したら監視を解除
                    bridgeObserver.unobserve(entry.target);
                }
            });
        }, bridgeObserverOptions);

        bridgeQuoteLines.forEach(line => {
            bridgeObserver.observe(line);
        });
    }

    // FAQ アコーディオン機能
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // すべての他のFAQを閉じる（オプション：複数開いても良い場合はこのブロックを削除）
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.getAttribute('aria-expanded') === 'true') {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherQuestion.parentElement.querySelector('.faq-answer');
                    otherAnswer.hidden = true;
                }
            });

            // クリックされたFAQの開閉
            if (isExpanded) {
                question.setAttribute('aria-expanded', 'false');
                answer.hidden = true;
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.hidden = false;
            }
        });
    });

    // 画像拡大モーダル機能
    const modal = document.getElementById('imageModal');
    const modalImg = modal.querySelector('.image-modal-img');
    const modalClose = modal.querySelector('.image-modal-close');
    const modalOverlay = modal.querySelector('.image-modal-overlay');
    const certificateImages = document.querySelectorAll('.credential-certificate');

    // 証明書画像をクリックしたらモーダルを開く
    certificateImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.hidden = false;
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            // bodyのスクロールを防止
            document.body.style.overflow = 'hidden';
        });
    });

    // 閉じるボタンをクリック
    modalClose.addEventListener('click', () => {
        closeModal();
    });

    // オーバーレイをクリック
    modalOverlay.addEventListener('click', () => {
        closeModal();
    });

    // Escキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    // モーダルを閉じる関数
    function closeModal() {
        modal.hidden = true;
        modalImg.src = '';
        // bodyのスクロールを復元
        document.body.style.overflow = '';
    }
});
