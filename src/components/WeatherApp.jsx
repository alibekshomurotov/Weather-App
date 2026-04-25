import { useState, useEffect, useRef, useCallback } from "react";

// To'liq tarjima lug'ati
const translations = {
    uz: {
        appName: "Weather Pro",
        date: "Sana",
        search: "Shahar qidirish...",
        feels: "His etiladi",
        humidity: "Namlik",
        wind: "Shamol",
        pressure: "Bosim",
        visibility: "Ko'rinish",
        sunrise: "Quyosh chiqishi",
        sunset: "Quyosh botishi",
        forecast: "Prognoz",
        today: "Bugun",
        tomorrow: "Ertaga",
        hourly: "Soatlik",
        weekly: "Haftalik",
        refresh: "Yangilash",
        location: "Mening joylashuvim",
        favorites: "Sevimlilar",
        addCity: "Shahar qo'shish",
        loading: "Yuklanmoqda...",
        notFound: "Shahar topilmadi",
        airQuality: "Havo sifati",
        windDirection: "Shamol yo'nalishi",
        good: "Yaxshi",
        moderate: "O'rtacha",
        bad: "Yomon",
        veryBad: "Juda yomon",
        uvIndex: "UV indeks",
        low: "Past",
        medium: "O'rtacha",
        high: "Yuqori",
        veryHigh: "Juda yuqori",
        extreme: "Ekstremal",
        chanceOfRain: "Yomg'ir ehtimoli",
        moonPhase: "Oy fazasi",
        newMoon: "Yangi oy",
        waxingCrescent: "O'sayotgan hilol",
        firstQuarter: "Birinchi chorak",
        waxingGibbous: "O'sayotgan",
        fullMoon: "To'lin oy",
        waningGibbous: "Kamayayotgan",
        lastQuarter: "So'nggi chorak",
        waningCrescent: "Kamayayotgan hilol",
        sunriseTime: "Quyosh chiqish vaqti",
        sunsetTime: "Quyosh botish vaqti",
        daylight: "Kun uzunligi",
        language: "Til",
        units: "O'lchov birligi",
        settings: "Sozlamalar",
        detailedInfo: "Batafsil ma'lumot",
        weatherDetails: "Ob-havo tafsilotlari",
        clothingAdvice: "Kiyim tavsiyasi",
        activityAdvice: "Faoliyat tavsiyasi",
        advice: {
            extremeCold: "🧊 Juda sovuq! Iloji boricha uyda qoling, issiq kiyining",
            veryCold: "❄️ Juda sovuq! Qalin kiyiming, qo'lqop va sharf taqing",
            cold: "🥶 Sovuq! Issiq palto va botinka kiying",
            cool: "🌬️ Salqin! Yengil kurtka yoki sviter kiying",
            mild: "😊 Yoqimli! Yengil kiyim kiyish mumkin",
            warm: "☀️ Iliq! Yengil va ochiq rangli kiyimlar",
            hot: "🌡️ Issiq! Yengil, paxta kiyimlar, shlyapa kiying",
            veryHot: "🔥 Juda issiq! Soyada bo'ling, ko'p suv iching",
            extremeHot: "☠️ Xavfli issiq! Tashqariga chiqmang, konditsionerda qoling",
        },
        activityAdvice: {
            sunny: "🌞 Sayr qilish va ochiq havoda dam olish uchun ajoyib kun!",
            cloudy: "☁️ Ochiq havoda yurish mumkin, lekin soyabon oling",
            rainy: "🌧️ Uyda qolib kino ko'rish yoki kitob o'qish tavsiya etiladi",
            snowy: "⛄ Qor odam yasash va chana uchish uchun ajoyib!",
            stormy: "⛈️ Uyda qoling, xavfsizlik choralarini ko'ring",
            windy: "💨 Shamolli, uchish va suzish tavsiya etilmaydi",
        },
        clothingAdvice: {
            winter: "Qalin palto, qo'lqop, sharf va issiq botinka",
            autumn: "Kurtka, sviter va yopiq poyabzal",
            spring: "Yengil kurtka yoki kardigan",
            summer: "Yengil, nafas oluvchi kiyimlar va quyoshdan saqlovchi shlyapa",
        },
        days: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
        shortDays: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Juma", "Shan"],
        months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
        yes: "Ha",
        no: "Yo'q",
        save: "Saqlash",
        cancel: "Bekor qilish",
    },
    ru: {
        appName: "Weather Pro",
        date: "Дата",
        search: "Поиск города...",
        feels: "Ощущается",
        humidity: "Влажность",
        wind: "Ветер",
        pressure: "Давление",
        visibility: "Видимость",
        sunrise: "Восход",
        sunset: "Закат",
        forecast: "Прогноз",
        today: "Сегодня",
        tomorrow: "Завтра",
        hourly: "Почасовой",
        weekly: "Недельный",
        refresh: "Обновить",
        location: "Мое местоположение",
        favorites: "Избранное",
        addCity: "Добавить город",
        loading: "Загрузка...",
        notFound: "Город не найден",
        airQuality: "Качество воздуха",
        windDirection: "Направление ветра",
        good: "Хорошее",
        moderate: "Среднее",
        bad: "Плохое",
        veryBad: "Очень плохое",
        uvIndex: "УФ индекс",
        low: "Низкий",
        medium: "Средний",
        high: "Высокий",
        veryHigh: "Очень высокий",
        extreme: "Экстремальный",
        chanceOfRain: "Вероятность дождя",
        moonPhase: "Фаза луны",
        newMoon: "Новолуние",
        waxingCrescent: "Растущий серп",
        firstQuarter: "Первая четверть",
        waxingGibbous: "Растущая",
        fullMoon: "Полнолуние",
        waningGibbous: "Убывающая",
        lastQuarter: "Последняя четверть",
        waningCrescent: "Убывающий серп",
        sunriseTime: "Время восхода",
        sunsetTime: "Время заката",
        daylight: "Световой день",
        language: "Язык",
        units: "Единицы измерения",
        settings: "Настройки",
        detailedInfo: "Подробная информация",
        weatherDetails: "Детали погоды",
        clothingAdvice: "Советы по одежде",
        activityAdvice: "Рекомендации активности",
        advice: {
            extremeCold: "🧊 Экстремальный холод! Оставайтесь дома, одевайтесь тепло",
            veryCold: "❄️ Очень холодно! Теплая одежда, перчатки и шарф обязательны",
            cold: "🥶 Холодно! Теплое пальто и ботинки",
            cool: "🌬️ Прохладно! Легкая куртка или свитер",
            mild: "😊 Комфортно! Можно одеваться легко",
            warm: "☀️ Тепло! Легкая и светлая одежда",
            hot: "🌡️ Жарко! Легкая хлопковая одежда, шляпа",
            veryHot: "🔥 Очень жарко! Будьте в тени, пейте больше воды",
            extremeHot: "☠️ Опасно жарко! Не выходите на улицу, оставайтесь в помещении",
        },
        activityAdvice: {
            sunny: "🌞 Отличный день для прогулок и отдыха на природе!",
            cloudy: "☁️ Можно гулять, но возьмите зонт",
            rainy: "🌧️ Рекомендуется остаться дома и посмотреть фильм",
            snowy: "⛄ Отличное время для снеговика и катания на санках!",
            stormy: "⛈️ Оставайтесь дома, соблюдайте меры безопасности",
            windy: "💨 Ветрено, не рекомендуется летать и плавать",
        },
        clothingAdvice: {
            winter: "Теплое пальто, перчатки, шарф и теплые ботинки",
            autumn: "Куртка, свитер и закрытая обувь",
            spring: "Легкая куртка или кардиган",
            summer: "Легкая дышащая одежда и шляпа от солнца",
        },
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        shortDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        yes: "Да",
        no: "Нет",
        save: "Сохранить",
        cancel: "Отмена",
    },
    en: {
        appName: "Weather Pro",
        date: "Date",
        search: "Search city...",
        feels: "Feels like",
        humidity: "Humidity",
        wind: "Wind",
        pressure: "Pressure",
        visibility: "Visibility",
        sunrise: "Sunrise",
        sunset: "Sunset",
        forecast: "Forecast",
        today: "Today",
        tomorrow: "Tomorrow",
        hourly: "Hourly",
        weekly: "Weekly",
        refresh: "Refresh",
        location: "My Location",
        favorites: "Favorites",
        addCity: "Add City",
        loading: "Loading...",
        notFound: "City not found",
        airQuality: "Air Quality",
        windDirection: "Wind Direction",
        good: "Good",
        moderate: "Moderate",
        bad: "Bad",
        veryBad: "Very Bad",
        uvIndex: "UV Index",
        low: "Low",
        medium: "Medium",
        high: "High",
        veryHigh: "Very High",
        extreme: "Extreme",
        chanceOfRain: "Chance of Rain",
        moonPhase: "Moon Phase",
        newMoon: "New Moon",
        waxingCrescent: "Waxing Crescent",
        firstQuarter: "First Quarter",
        waxingGibbous: "Waxing Gibbous",
        fullMoon: "Full Moon",
        waningGibbous: "Waning Gibbous",
        lastQuarter: "Last Quarter",
        waningCrescent: "Waning Crescent",
        sunriseTime: "Sunrise Time",
        sunsetTime: "Sunset Time",
        daylight: "Daylight Duration",
        language: "Language",
        units: "Units",
        settings: "Settings",
        detailedInfo: "Detailed Info",
        weatherDetails: "Weather Details",
        clothingAdvice: "Clothing Advice",
        activityAdvice: "Activity Advice",
        advice: {
            extremeCold: "🧊 Extremely cold! Stay indoors, dress warmly",
            veryCold: "❄️ Very cold! Heavy winter clothing, gloves and scarf required",
            cold: "🥶 Cold! Warm coat and boots recommended",
            cool: "🌬️ Cool! Light jacket or sweater",
            mild: "😊 Comfortable! Light clothing is fine",
            warm: "☀️ Warm! Light and bright colored clothing",
            hot: "🌡️ Hot! Light cotton clothes, wear a hat",
            veryHot: "🔥 Very hot! Stay in shade, drink plenty of water",
            extremeHot: "☠️ Dangerously hot! Don't go outside, stay in AC",
        },
        activityAdvice: {
            sunny: "🌞 Perfect day for walking and outdoor activities!",
            cloudy: "☁️ Good for outdoor activities, but bring an umbrella",
            rainy: "🌧️ Better stay home and watch a movie or read a book",
            snowy: "⛄ Great time for building a snowman and sledding!",
            stormy: "⛈️ Stay indoors, follow safety precautions",
            windy: "💨 Windy, flying and swimming not recommended",
        },
        clothingAdvice: {
            winter: "Heavy coat, gloves, scarf and warm boots",
            autumn: "Jacket, sweater and closed shoes",
            spring: "Light jacket or cardigan",
            summer: "Light breathable clothes and sun hat",
        },
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        yes: "Yes",
        no: "No",
        save: "Save",
        cancel: "Cancel",
    }
};

// CSS Styles obyekti
const S = {
    app: {
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a0a1a 0%, #1a1a3e 30%, #0d1b2a 60%, #1b2838 100%)",
        fontFamily: "'Segoe UI', 'Inter', system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        fontSize: "15px",
    },
    stars: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "280px 1fr 340px",
        gap: "16px",
        maxWidth: "1440px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        padding: "16px",
        minHeight: "100vh",
    },
    panel: {
        background: "rgba(20, 20, 50, 0.4)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        borderRadius: "20px",
        padding: "20px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        height: "fit-content",
        position: "sticky",
        top: "16px",
    },
    sectionTitle: {
        color: "rgba(255,255,255,0.35)",
        fontSize: "10px",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "1.8px",
        marginBottom: "12px",
    },
    searchWrap: {
        position: "relative",
        marginBottom: "16px",
    },
    searchInput: {
        width: "100%",
        padding: "13px 16px 13px 44px",
        borderRadius: "14px",
        border: "1.5px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.05)",
        color: "#fff",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
        transition: "all 0.25s",
        fontWeight: "500",
    },
    searchIcon: {
        position: "absolute",
        left: "15px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "15px",
        opacity: 0.4,
        pointerEvents: "none",
    },
};

function WeatherApp() {
    const [city, setCity] = useState("Tashkent");
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [hourlyForecast, setHourlyForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchInput, setSearchInput] = useState("");
    const [unit, setUnit] = useState('C');
    const [language, setLanguage] = useState(() => localStorage.getItem('weatherLang') || 'uz');
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('weatherFavs')) || ['Toshkent', 'London', 'Tokyo'];
        } catch { return ['Toshkent', 'London', 'Tokyo']; }
    });
    const [activeTab, setActiveTab] = useState('today');
    const [showSettings, setShowSettings] = useState(false);
    const [showAdvice, setShowAdvice] = useState(false);
    const canvasRef = useRef(null);

    const t = translations[language] || translations.uz;

    const convertTemp = useCallback((celsius) => {
        const c = parseInt(celsius);
        if (unit === 'F') return Math.round((c * 9/5) + 32);
        return Math.round(c);
    }, [unit]);

    const tempUnit = unit === 'C' ? '°C' : '°F';

    const fetchWeather = useCallback(async (cityName) => {
        if (!cityName?.trim()) return;
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`https://wttr.in/${encodeURIComponent(cityName)}?format=j1`);
            if (!res.ok) throw new Error("not found");
            const data = await res.json();
            setWeather(data);
            setForecast(data.weather?.slice(0, 7) || []);
            setHourlyForecast(data.weather?.[0]?.hourly?.slice(0, 8) || []);
            setCity(cityName);
            setSearchInput("");
        } catch {
            setError(t.notFound);
        } finally {
            setLoading(false);
        }
    }, [t.notFound]);

    useEffect(() => {
        fetchWeather("Tashkent");
    }, []);

    useEffect(() => {
        localStorage.setItem('weatherLang', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('weatherFavs', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (city) fetchWeather(city);
        }, 600000);
        return () => clearInterval(interval);
    }, [city, fetchWeather]);

    // Canvas grafik
    useEffect(() => {
        if (hourlyForecast && canvasRef.current && activeTab === 'hourly') {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const w = canvas.width = canvas.offsetWidth * 2;
            const h = canvas.height = canvas.offsetHeight * 2;
            ctx.scale(2, 2);
            
            ctx.clearRect(0, 0, w, h);
            if (!hourlyForecast.length) return;

            const temps = hourlyForecast.map(h => convertTemp(parseInt(h.tempC)));
            const maxT = Math.max(...temps) + 5;
            const minT = Math.min(...temps) - 5;
            const range = maxT - minT || 1;
            const cw = canvas.offsetWidth;
            const ch = canvas.offsetHeight;

            // Gradient
            const grad = ctx.createLinearGradient(0, 0, cw, 0);
            grad.addColorStop(0, '#60a5fa');
            grad.addColorStop(0.5, '#f59e0b');
            grad.addColorStop(1, '#ef4444');

            // Chiziq
            ctx.beginPath();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';

            temps.forEach((t, i) => {
                const x = (i / (temps.length - 1)) * (cw - 40) + 20;
                const y = ch - ((t - minT) / range) * (ch - 50) - 25;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Nuqtalar
            temps.forEach((t, i) => {
                const x = (i / (temps.length - 1)) * (cw - 40) + 20;
                const y = ch - ((t - minT) / range) * (ch - 50) - 25;
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
                ctx.strokeStyle = '#8b5cf6';
                ctx.lineWidth = 2.5;
                ctx.stroke();
            });
        }
    }, [hourlyForecast, activeTab, unit, convertTemp]);

    const getWeatherEmoji = (code) => {
        const c = parseInt(code);
        if (c <= 2) return '☀️';
        if (c <= 5) return '⛅';
        if (c <= 8) return '🌧️';
        if (c <= 11) return '❄️';
        if (c <= 14) return '⛈️';
        if (c <= 17) return '🌨️';
        if (c <= 20) return '🌫️';
        return '🌤️';
    };

    const getWindDir = (deg) => {
        const dirs = ['⬆️ N', '↗️ NE', '➡️ E', '↘️ SE', '⬇️ S', '↙️ SW', '⬅️ W', '↖️ NW'];
        return dirs[Math.round(parseInt(deg) / 45) % 8];
    };

    const getAQI = (val) => {
        const v = parseInt(val) || 50;
        if (v <= 50) return { text: t.good, color: '#10b981', emoji: '🟢' };
        if (v <= 100) return { text: t.moderate, color: '#f59e0b', emoji: '🟡' };
        if (v <= 200) return { text: t.bad, color: '#f97316', emoji: '🟠' };
        return { text: t.veryBad, color: '#ef4444', emoji: '🔴' };
    };

    const getUVLevel = (uv) => {
        const v = parseInt(uv) || 0;
        if (v <= 2) return t.low;
        if (v <= 5) return t.medium;
        if (v <= 7) return t.high;
        if (v <= 10) return t.veryHigh;
        return t.extreme;
    };

    const getAdvice = (code, temp) => {
        const celsius = parseInt(temp);
        const c = parseInt(code);
        
        if (celsius < -20) return t.advice.extremeCold;
        if (celsius < -5) return t.advice.veryCold;
        if (celsius < 5) return t.advice.cold;
        if (celsius < 12) return t.advice.cool;
        if (celsius < 22) return t.advice.mild;
        if (celsius < 30) return t.advice.warm;
        if (celsius < 37) return t.advice.hot;
        if (celsius < 42) return t.advice.veryHot;
        return t.advice.extremeHot;
    };

    const getActivityAdvice = (code) => {
        const c = parseInt(code);
        if (c <= 2) return t.activityAdvice.sunny;
        if (c <= 5) return t.activityAdvice.cloudy;
        if (c <= 9) return t.activityAdvice.rainy;
        if (c <= 14) return t.activityAdvice.stormy;
        if (c <= 17) return t.activityAdvice.snowy;
        return t.activityAdvice.windy;
    };

const getClothingAdvice = (temp) => {
    const celsius = parseInt(temp);
    if (celsius < 0) return "Qalin palto, qo'lqop, sharf va issiq botinka";
    if (celsius < 10) return "Kurtka, sviter va yopiq poyabzal";
    if (celsius < 20) return "Yengil kurtka yoki kardigan";
    return "Yengil, nafas oluvchi kiyimlar va quyoshdan saqlovchi shlyapa";
};

    const getDaylightDuration = (sunrise, sunset) => {
        try {
            const [sh, sm] = sunrise.split(':').map(Number);
            const [eh, em] = sunset.split(':').map(Number);
            let totalMin = (eh * 60 + em) - (sh * 60 + sm);
            if (totalMin < 0) totalMin += 24 * 60;
            const hours = Math.floor(totalMin / 60);
            const mins = totalMin % 60;
            return `${hours}s ${mins}daq`;
        } catch {
            return 'N/A';
        }
    };

    const getMoonEmoji = (phase) => {
        const phases = {
            'New Moon': '🌑',
            'Waxing Crescent': '🌒',
            'First Quarter': '🌓',
            'Waxing Gibbous': '🌔',
            'Full Moon': '🌕',
            'Waning Gibbous': '🌖',
            'Last Quarter': '🌗',
            'Waning Crescent': '🌘',
        };
        return phases[phase] || '🌙';
    };

    const getDayName = (dateStr, index) => {
        if (index === 0) return t.today;
        if (index === 1) return t.tomorrow;
        try {
            const d = new Date(dateStr);
            return t.shortDays[d.getDay()];
        } catch { return dateStr; }
    };

    const currentCondition = weather?.current_condition?.[0];
    const astronomy = weather?.weather?.[0]?.astronomy?.[0];

    const btnHoverIn = (e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.transform = 'scale(1.03)';
    };
    const btnHoverOut = (e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
        e.currentTarget.style.transform = 'scale(1)';
    };

    return (
        <div style={S.app}>
            {/* Yulduzli fon */}
            <div style={S.stars}>
                {[...Array(100)].map((_, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        width: Math.random() * 2 + 1 + 'px',
                        height: Math.random() * 2 + 1 + 'px',
                        background: "#fff",
                        borderRadius: "50%",
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.6 + 0.2,
                        animation: `twinkle ${Math.random() * 4 + 2}s infinite ${Math.random() * 3}s`,
                    }} />
                ))}
            </div>

            {/* Asosiy Grid */}
            <div style={S.grid} className="main-grid">
                
                {/* ========= CHAP PANEL ========= */}
                <div style={S.panel} className="side-panel">
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '14px',
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '22px', boxShadow: '0 8px 25px rgba(99,102,241,0.3)'
                        }}>🌤️</div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '17px' }}>{t.appName}</div>
                            <div style={{ fontSize: '11px', opacity: 0.4 }}>
                                {new Date().toLocaleDateString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US', { 
                                    weekday: 'long', day: 'numeric', month: 'long' 
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Til */}
                    <div style={{ marginBottom: '14px' }}>
                        <div style={S.sectionTitle}>🌐 {t.language}</div>
                        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '3px' }}>
                            {[
                                { code: 'uz', label: "O'zbek" },
                                { code: 'ru', label: 'Русский' },
                                { code: 'en', label: 'English' }
                            ].map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    style={{
                                        flex: 1, padding: '7px 8px', borderRadius: '8px',
                                        border: 'none', fontSize: '12px', fontWeight: '600',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                        background: language === lang.code ? '#6366f1' : 'transparent',
                                        color: language === lang.code ? '#fff' : 'rgba(255,255,255,0.5)',
                                    }}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Birlik */}
                    <div style={{ marginBottom: '14px' }}>
                        <div style={S.sectionTitle}>📏 {t.units}</div>
                        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '3px' }}>
                            {['C', 'F'].map(u => (
                                <button
                                    key={u}
                                    onClick={() => setUnit(u)}
                                    style={{
                                        flex: 1, padding: '7px', borderRadius: '8px',
                                        border: 'none', fontSize: '13px', fontWeight: '700',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                        background: unit === u ? '#6366f1' : 'transparent',
                                        color: unit === u ? '#fff' : 'rgba(255,255,255,0.5)',
                                    }}
                                >
                                    °{u}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sevimlilar */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px' }}>
                        <div style={S.sectionTitle}>⭐ {t.favorites}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '280px', overflowY: 'auto' }}>
                            {favorites.map(fav => (
                                <div
                                    key={fav}
                                    onClick={() => fetchWeather(fav)}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '10px 12px', borderRadius: '12px', cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        background: city === fav ? 'rgba(99,102,241,0.2)' : 'transparent',
                                        border: city === fav ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                                        color: city === fav ? '#fff' : 'rgba(255,255,255,0.55)',
                                        fontSize: '13px', fontWeight: '500',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (city !== fav) {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                            e.currentTarget.style.color = '#fff';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (city !== fav) {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                                        }
                                    }}
                                >
                                    <span>
                                        <span style={{
                                            display: 'inline-block', width: '6px', height: '6px',
                                            borderRadius: '50%', marginRight: '10px',
                                            background: city === fav ? '#8b5cf6' : 'rgba(255,255,255,0.25)',
                                            boxShadow: city === fav ? '0 0 8px #8b5cf6' : 'none',
                                        }} />
                                        {fav}
                                    </span>
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setFavorites(prev => prev.filter(f => f !== fav));
                                        }}
                                        style={{ cursor: 'pointer', opacity: 0.5, fontSize: '14px' }}
                                        title="O'chirish"
                                    >
                                        ✕
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => {
                                const newCity = prompt(t.addCity);
                                if (newCity && !favorites.includes(newCity)) {
                                    setFavorites(prev => [...prev, newCity]);
                                }
                            }}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '12px',
                                border: '1.5px dashed rgba(255,255,255,0.12)',
                                background: 'transparent', color: 'rgba(255,255,255,0.4)',
                                fontSize: '12px', cursor: 'pointer', marginTop: '8px',
                                transition: 'all 0.2s', fontWeight: '500',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                                e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                            }}
                        >
                            + {t.addCity}
                        </button>
                    </div>
                </div>

                {/* ========= MARKAZ ========= */}
                <div>
                    {/* Qidiruv */}
                    <div style={S.searchWrap}>
                        <span style={S.searchIcon}>🔍</span>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchWeather(searchInput)}
                            placeholder={t.search}
                            style={S.searchInput}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                        />
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '4px', marginBottom: '16px' }}>
                        {[
                            { key: 'today', icon: '📊', label: t.today },
                            { key: 'hourly', icon: '⏰', label: t.hourly },
                            { key: 'weekly', icon: '📅', label: t.weekly },
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    flex: 1, padding: '9px 6px', borderRadius: '10px',
                                    border: 'none', cursor: 'pointer', fontSize: '12px',
                                    fontWeight: '600', transition: 'all 0.2s',
                                    background: activeTab === tab.key ? 'rgba(99,102,241,0.3)' : 'transparent',
                                    color: activeTab === tab.key ? '#fff' : 'rgba(255,255,255,0.4)',
                                }}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div style={{
                                width: '44px', height: '44px', margin: '0 auto 14px',
                                border: '3px solid rgba(255,255,255,0.08)',
                                borderTopColor: '#8b5cf6', borderRadius: '50%',
                                animation: 'spin 0.8s linear infinite',
                            }} />
                            <div style={{ opacity: 0.5 }}>{t.loading}</div>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                            borderRadius: '14px', padding: '14px 18px',
                            textAlign: 'center', fontSize: '13px', color: '#fca5a5',
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Ob-havo kontenti */}
                    {weather && !loading && (
                        <>
                            {activeTab === 'today' && (
                                <>
                                    {/* Hero Card */}
                                    <div style={{
                                        background: 'linear-gradient(145deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))',
                                        borderRadius: '24px', padding: '28px', textAlign: 'center',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        position: 'relative', overflow: 'hidden', marginBottom: '14px',
                                    }}>
                                        <div style={{ fontSize: '72px', lineHeight: 1 }}>...</div>
                                        <h2 style={{ fontSize: '26px', fontWeight: '700', margin: '4px 0' }}>📍 {city}</h2>
                                        <div style={{ opacity: 0.5, fontSize: '14px' }}>{currentCondition?.weatherDesc?.[0]?.value}</div>
                                        <div style={{ fontSize: '72px', fontWeight: '800', lineHeight: 1, margin: '8px 0' }}>
                                            {convertTemp(currentCondition?.temp_C)}{tempUnit}
                                        </div>
                                        <div style={{ opacity: 0.5, fontSize: '13px' }}>
                                            {t.feels} {convertTemp(currentCondition?.FeelsLikeC)}{tempUnit}
                                        </div>
                                        <div style={{
                                            display: 'inline-block', marginTop: '12px',
                                            background: 'rgba(99,102,241,0.25)', borderRadius: '20px',
                                            padding: '8px 18px', fontSize: '12px', fontWeight: '600',
                                            border: '1px solid rgba(99,102,241,0.3)',
                                        }}>
                                            {getAdvice(currentCondition?.weatherCode, currentCondition?.temp_C)}
                                        </div>
                                    </div>

                                    {/* Tafsilotlar Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '14px' }}>
                                        {[
                                            { icon: '💧', label: t.humidity, val: currentCondition?.humidity + '%' },
                                            { icon: '💨', label: t.wind, val: currentCondition?.windspeedKmph + ' km/h ' + getWindDir(currentCondition?.winddirDegree) },
                                            { icon: '🌡️', label: t.pressure, val: currentCondition?.pressure + ' hPa' },
                                            { icon: '👁️', label: t.visibility, val: currentCondition?.visibility + ' km' },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
                                                    padding: '14px', textAlign: 'center',
                                                    border: '1px solid rgba(255,255,255,0.05)',
                                                    transition: 'all 0.25s', cursor: 'default',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{item.icon}</div>
                                                <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.35, marginBottom: '4px' }}>{item.label}</div>
                                                <div style={{ fontSize: '15px', fontWeight: '700' }}>{item.val}</div>
                                            </div>
                                        ))}
                                    </div>


                                </>
                            )}

                            {/* Soatlik grafik */}
                            {activeTab === 'hourly' && hourlyForecast && (
                                <div style={{
                                    background: 'rgba(255,255,255,0.03)', borderRadius: '20px',
                                    padding: '20px', border: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px' }}>
                                        ⏰ {t.hourly} {t.forecast}
                                    </h3>
                                    <canvas ref={canvasRef} style={{ width: '100%', height: '200px', borderRadius: '10px' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                                        {hourlyForecast.map((h, i) => (
                                            <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '10px', opacity: 0.4 }}>{(parseInt(h.time) || i * 3) + ':00'}</div>
                                                <div style={{ fontSize: '16px', margin: '3px 0' }}>{getWeatherEmoji(h.weatherCode)}</div>
                                                <div style={{ fontSize: '12px', fontWeight: '600' }}>{convertTemp(h.tempC)}°</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Haftalik */}
                            {activeTab === 'weekly' && forecast && (
                                <div style={{
                                    background: 'rgba(255,255,255,0.03)', borderRadius: '20px',
                                    padding: '16px', border: '1px solid rgba(255,255,255,0.05)',
                                }}>
                                    {forecast.map((day, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '11px 8px',
                                            borderBottom: i < forecast.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                                        }}>
                                            <span style={{ fontSize: '13px', fontWeight: '500', minWidth: '55px' }}>
                                                {getDayName(day.date, i)}
                                            </span>
                                            <span style={{ fontSize: '20px' }}>{getWeatherEmoji(day.hourly[0].weatherCode)}</span>
                                            <span style={{ fontSize: '13px' }}>
                                                <span style={{ opacity: 0.4 }}>{convertTemp(day.mintempC)}°</span>
                                                {' / '}
                                                <span style={{ fontWeight: '700' }}>{convertTemp(day.maxtempC)}°</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Yangilash */}
                            <button
                                onClick={() => fetchWeather(city)}
                                style={{
                                    width: '100%', padding: '13px', borderRadius: '14px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    background: 'rgba(255,255,255,0.04)',
                                    color: '#fff', fontSize: '14px', fontWeight: '600',
                                    cursor: 'pointer', marginTop: '14px', transition: 'all 0.2s',
                                }}
                                onMouseEnter={btnHoverIn}
                                onMouseLeave={btnHoverOut}
                            >
                                🔄 {t.refresh}
                            </button>
                        </>
                    )}
                </div>

                {/* ========= O'NG PANEL ========= */}
                <div style={S.panel} className="side-panel">
                    <div style={S.sectionTitle}>📋 {t.forecast}</div>
                    {forecast?.slice(1, 6).map((day, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.03)',
                        }}>
                            <span style={{ fontSize: '12px', opacity: 0.6, minWidth: '45px' }}>{getDayName(day.date, i + 1)}</span>
                            <span style={{ fontSize: '17px' }}>{getWeatherEmoji(day.hourly[0].weatherCode)}</span>
                            <span style={{ fontSize: '12px', fontWeight: '600' }}>
                                {convertTemp(day.maxtempC)}° <span style={{ opacity: 0.4 }}>{convertTemp(day.mintempC)}°</span>
                            </span>
                        </div>
                    ))}

                    {/* Quyosh vaqti */}
                    {astronomy && (
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(251,146,60,0.12), rgba(251,191,36,0.08))',
                            borderRadius: '16px', padding: '14px', margin: '14px 0',
                            border: '1px solid rgba(251,191,36,0.12)',
                            display: 'flex', justifyContent: 'space-around',
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '20px' }}>🌅</div>
                                <div style={{ fontSize: '9px', opacity: 0.4, margin: '3px 0' }}>{t.sunrise}</div>
                                <div style={{ fontSize: '13px', fontWeight: '700' }}>{astronomy.sunrise}</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '20px' }}>🌇</div>
                                <div style={{ fontSize: '9px', opacity: 0.4, margin: '3px 0' }}>{t.sunset}</div>
                                <div style={{ fontSize: '13px', fontWeight: '700' }}>{astronomy.sunset}</div>
                            </div>
                        </div>
                    )}

                    {/* Kun uzunligi */}
                    {astronomy && (
                        <div style={{
                            background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
                            padding: '12px', marginBottom: '12px', textAlign: 'center',
                            border: '1px solid rgba(255,255,255,0.04)',
                        }}>
                            <span style={{ fontSize: '10px', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                ⏱️ {t.daylight}
                            </span>
                            <div style={{ fontSize: '15px', fontWeight: '700', marginTop: '2px' }}>
                                {getDaylightDuration(astronomy.sunrise, astronomy.sunset)}
                            </div>
                        </div>
                    )}

                    {/* Havo sifati */}
                    {currentCondition && (
                        <div style={{
                            background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
                            padding: '12px', marginBottom: '12px',
                            border: '1px solid rgba(255,255,255,0.04)',
                        }}>
                            <div style={{ fontSize: '10px', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                🌬️ {t.airQuality}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', fontWeight: '500' }}>
                                    {getAQI(currentCondition.air_quality || 45).emoji} {getAQI(currentCondition.air_quality || 45).text}
                                </span>
                                <span style={{ fontSize: '18px', fontWeight: '800' }}>
                                    {currentCondition.air_quality || '45'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* UV indeks */}
                    {currentCondition && (
                        <div style={{
                            background: 'rgba(255,255,255,0.03)', borderRadius: '14px',
                            padding: '12px', marginBottom: '12px',
                            border: '1px solid rgba(255,255,255,0.04)',
                        }}>
                            <div style={{ fontSize: '10px', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                                ☀️ {t.uvIndex}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', fontWeight: '500' }}>
                                    {getUVLevel(currentCondition.uvIndex || 0)}
                                </span>
                                <span style={{ fontSize: '18px', fontWeight: '800' }}>
                                    {currentCondition.uvIndex || '0'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Geolokatsiya */}
                    <button
                        onClick={() => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(async (pos) => {
                                    try {
                                        const res = await fetch(`https://wttr.in/${pos.coords.latitude},${pos.coords.longitude}?format=j1`);
                                        const data = await res.json();
                                        const nearest = data.nearest_area?.[0]?.areaName?.[0]?.value;
                                        if (nearest) fetchWeather(nearest);
                                    } catch { /* error */ }
                                });
                            }
                        }}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '14px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.04)', color: '#fff',
                            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                            transition: 'all 0.2s', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: '8px',
                        }}
                        onMouseEnter={btnHoverIn}
                        onMouseLeave={btnHoverOut}
                    >
                        📍 {t.location}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes twinkle { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.9; } }
                
                @media (max-width: 1100px) {
                    .main-grid { grid-template-columns: 1fr !important; padding: 10px !important; }
                    .side-panel { display: none !important; }
                }
                
                * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent; }
                ::-webkit-scrollbar { width: 3px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
            `}</style>
        </div>
    );
}

export default WeatherApp;