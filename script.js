// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми секциями
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Функциональность для аудио плеера
    const audioItems = document.querySelectorAll('.audio-item');
    
    audioItems.forEach(item => {
        const playButton = item.querySelector('.fa-play-circle');
        const audio = item.querySelector('audio');
        
        if (playButton && audio) {
            playButton.addEventListener('click', function() {
                // Останавливаем все другие аудио
                document.querySelectorAll('audio').forEach(otherAudio => {
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                        otherAudio.currentTime = 0;
                    }
                });
                
                // Переключаем иконку
                const allPlayButtons = document.querySelectorAll('.fa-play-circle');
                allPlayButtons.forEach(btn => {
                    btn.classList.remove('fa-pause-circle');
                    btn.classList.add('fa-play-circle');
                });
                
                if (audio.paused) {
                    audio.play();
                    playButton.classList.remove('fa-play-circle');
                    playButton.classList.add('fa-pause-circle');
                    
                    // Добавляем эффект при воспроизведении
                    item.style.animation = 'audioPlay 0.5s ease-out';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 500);
                } else {
                    audio.pause();
                    playButton.classList.remove('fa-pause-circle');
                    playButton.classList.add('fa-play-circle');
                }
            });
            
            // Обновляем иконку когда аудио заканчивается
            audio.addEventListener('ended', function() {
                playButton.classList.remove('fa-pause-circle');
                playButton.classList.add('fa-play-circle');
            });
            
            // Добавляем эффект при наведении на аудио элемент
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.02)';
                this.style.boxShadow = '0 15px 35px rgba(255,107,157,0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        }
    });

    // Слайдер фотографий
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;

    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Показываем нужный слайд
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
        
        // Добавляем эффект при смене слайда
        const activeSlide = slides[index];
        activeSlide.style.animation = 'slideZoom 0.5s ease-out';
        setTimeout(() => {
            activeSlide.style.animation = '';
        }, 500);
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Обработчики для кнопок
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            // Добавляем эффект при клике
            this.style.animation = 'buttonPulse 0.5s ease-out';
            setTimeout(() => {
                this.style.animation = 'buttonFloat 2s ease-in-out infinite';
            }, 500);
        });
        
        nextBtn.addEventListener('click', function() {
            nextSlide();
            // Добавляем эффект при клике
            this.style.animation = 'buttonPulse 0.5s ease-out';
            setTimeout(() => {
                this.style.animation = 'buttonFloat 2s ease-in-out infinite';
            }, 500);
        });
    }

    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            // Добавляем эффект при клике
            indicator.style.animation = 'indicatorPulse 0.5s ease-out';
            setTimeout(() => {
                indicator.style.animation = '';
            }, 500);
        });
    });

    // Автоматическое переключение слайдов каждые 5 секунд
    setInterval(nextSlide, 5000);

    // Добавляем эффект при клике на слайд
    slides.forEach(slide => {
        slide.addEventListener('click', function() {
            // Добавляем эффект при клике
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Создаем дополнительные плавающие сердечки
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.opacity = '0.7';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.transition = 'all 4s linear';
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255,107,157,0.5))';
        
        document.body.appendChild(heart);
        
        // Анимация подъема
        setTimeout(() => {
            heart.style.top = '-50px';
            heart.style.opacity = '0';
            heart.style.transform = 'rotate(360deg)';
        }, 100);
        
        // Удаляем элемент после анимации
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 4000);
    }

    // Создаем сердечки каждые 3 секунды
    setInterval(createFloatingHeart, 3000);

    // Эффект параллакса для заголовка
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const title = document.querySelector('.title');
        if (title) {
            title.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Добавляем эффект печатания для подзаголовка
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Запускаем эффект печатания через 1 секунду
        setTimeout(typeWriter, 1000);
    }

    // Добавляем эффект свечения для заголовка
    const title = document.querySelector('.title');
    if (title) {
        setInterval(() => {
            title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,107,157,0.5)';
            setTimeout(() => {
                title.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
            }, 500);
        }, 3000);
    }

    // Функция для добавления реальных фотографий в слайдер
    function addPhoto(photoUrl, description) {
        const sliderContainer = document.querySelector('.slider-container');
        const slideCount = sliderContainer.children.length;
        
        // Создаем новый слайд
        const newSlide = document.createElement('div');
        newSlide.className = 'slide';
        newSlide.innerHTML = `
            <img src="${photoUrl}" alt="${description}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;">
        `;
        
        sliderContainer.appendChild(newSlide);
        
        // Добавляем новый индикатор
        const indicatorsContainer = document.querySelector('.slider-indicators');
        const newIndicator = document.createElement('span');
        newIndicator.className = 'indicator';
        newIndicator.setAttribute('data-slide', slideCount);
        newIndicator.addEventListener('click', () => showSlide(slideCount));
        
        indicatorsContainer.appendChild(newIndicator);
        
        // Обновляем слайдер
        slides = document.querySelectorAll('.slide');
        indicators = document.querySelectorAll('.indicator');
    }

    // Функция для добавления аудио файлов
    function addAudio(audioUrl, title, description) {
        const playlistContainer = document.querySelector('.playlist-container');
        const audioItem = document.createElement('div');
        audioItem.className = 'audio-item';
        audioItem.innerHTML = `
            <div class="audio-info">
                <i class="fas fa-play-circle"></i>
                <div class="audio-details">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
            <audio controls>
                <source src="${audioUrl}" type="audio/mpeg">
                Ваш браузер не поддерживает аудио элемент.
            </audio>
        `;
        playlistContainer.appendChild(audioItem);
    }

    // Экспортируем функции для использования
    window.birthdaySite = {
        addPhoto: addPhoto,
        addAudio: addAudio
    };

    // Добавляем эффект конфетти при загрузке страницы
    function createConfetti() {
        const colors = ['#ff6b9d', '#667eea', '#764ba2', '#f093fb', '#f5576c'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.filter = 'drop-shadow(0 0 5px rgba(255,255,255,0.5))';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
    }

    // Добавляем CSS для анимации падения конфетти
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            to {
                transform: translateY(${window.innerHeight}px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes audioPlay {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Запускаем конфетти через 2 секунды после загрузки
    setTimeout(createConfetti, 2000);

    // Функциональность для котика
    const catImage = document.getElementById('catImage');
    const catPopup = document.getElementById('catPopup');
    
    if (catImage && catPopup) {
        let clickCount = 0;
        const funnyMessages = [
            "Да, это я тебя нарисовала, че пальцем в него тыкаешь! 😸",
            "Мяу! Не трогай меня! 😾",
            "Хватит тыкать, я же живой! 😅",
            "Опять тыкаешь? Я обижаюсь! 😤",
            "Мяу-мяу, хватит уже! 😹",
            "Я не игрушка! 😼",
            "Стоп! Я сплю! 😴",
            "Мяу! Ты меня разбудил! 😸",
            "Хватит тыкать, я красивый! 😻",
            "Мяу! Я не кнопка! 😸"
        ];

        catImage.addEventListener('click', function() {
            clickCount++;
            
            // Показываем всплывающий текст
            const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            catPopup.querySelector('p').textContent = randomMessage;
            
            // Позиционируем всплывающий текст над котиком
            const rect = this.getBoundingClientRect();
            catPopup.style.left = (rect.left + rect.width / 2) + 'px';
            catPopup.style.top = (rect.top - 120) + 'px';
            catPopup.style.transform = 'translateX(-50%)';
            
            // Сначала скрываем, потом показываем для обновления анимации
            catPopup.classList.remove('show');
            setTimeout(() => {
                catPopup.classList.add('show');
            }, 10);
            
            // Добавляем эффект при клике
            this.style.transform = 'scale(0.9) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Скрываем всплывающий текст через 4 секунды
            setTimeout(() => {
                catPopup.classList.remove('show');
            }, 4000);
            
            // Каждый 5-й клик - особый эффект
            if (clickCount % 5 === 0) {
                // Создаем дополнительные сердечки вокруг котика
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.innerHTML = '💕';
                        heart.style.position = 'absolute';
                        heart.style.left = (this.offsetLeft + this.offsetWidth / 2) + 'px';
                        heart.style.top = (this.offsetTop + this.offsetHeight / 2) + 'px';
                        heart.style.fontSize = '20px';
                        heart.style.pointerEvents = 'none';
                        heart.style.zIndex = '1000';
                        heart.style.transition = 'all 2s ease-out';
                        heart.style.filter = 'drop-shadow(0 0 10px rgba(255,107,157,0.5))';
                        
                        document.body.appendChild(heart);
                        
                        // Анимация разлетания сердечек
                        setTimeout(() => {
                            const angle = (i * 45) * Math.PI / 180;
                            const distance = 100;
                            heart.style.left = (this.offsetLeft + this.offsetWidth / 2 + Math.cos(angle) * distance) + 'px';
                            heart.style.top = (this.offsetTop + this.offsetHeight / 2 + Math.sin(angle) * distance) + 'px';
                            heart.style.opacity = '0';
                            heart.style.transform = 'rotate(360deg)';
                        }, 100);
                        
                        // Удаляем сердечко
                        setTimeout(() => {
                            if (heart.parentNode) {
                                heart.parentNode.removeChild(heart);
                            }
                        }, 2000);
                    }, i * 100);
                }
            }
        });
        
        // Добавляем эффект при наведении
        catImage.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.filter = 'drop-shadow(0 15px 30px rgba(255,107,157,0.5)) brightness(1.1)';
        });
        
        catImage.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))';
        });
    }
}); 