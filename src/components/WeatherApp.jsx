import { useState, useEffect, useRef, useCallback } from "react";

// Tarjimalar (avvalgidek qoldiriladi)
const translations = {
    uz: {
        appName: "Weather Pro",
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
        language: "Til",
        units: "O'lchov birligi",
        settings: "Sozlamalar",
        daylight: "Kun uzunligi",
        advice: {
            extremeCold: "🧊 Juda sovuq! Uyda qoling",
            veryCold: "❄️ Juda sovuq! Issiq kiyining",
            cold: "🥶 Sovuq! Issiq palto kiying",
            cool: "🌬️ Salqin! Yengil kurtka kiying",
            mild: "😊 Yoqimli! Yengil kiyim kiyish mumkin",
            warm: "☀️ Iliq! Yengil kiyimlar",
            hot: "🌡️ Issiq! Ko'p suv iching",
            veryHot: "🔥 Juda issiq! Soyada bo'ling",
            extremeHot: "☠️ Xavfli issiq! Tashqariga chiqmang",
        },
        days: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
        shortDays: ["Yak", "Dush", "Sesh", "Chor", "Pay", "Juma", "Shan"],
        months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    },
    ru: {
        appName: "Weather Pro",
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
        language: "Язык",
        units: "Единицы",
        settings: "Настройки",
        daylight: "Световой день",
        advice: {
            extremeCold: "🧊 Экстремальный холод!",
            veryCold: "❄️ Очень холодно!",
            cold: "🥶 Холодно!",
            cool: "🌬️ Прохладно!",
            mild: "😊 Комфортно!",
            warm: "☀️ Тепло!",
            hot: "🌡️ Жарко!",
            veryHot: "🔥 Очень жарко!",
            extremeHot: "☠️ Опасно жарко!",
        },
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        shortDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    },
    en: {
        appName: "Weather Pro",
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
        language: "Language",
        units: "Units",
        settings: "Settings",
        daylight: "Daylight",
        advice: {
            extremeCold: "🧊 Extremely cold!",
            veryCold: "❄️ Very cold!",
            cold: "🥶 Cold!",
            cool: "🌬️ Cool!",
            mild: "😊 Comfortable!",
            warm: "☀️ Warm!",
            hot: "🌡️ Hot!",
            veryHot: "🔥 Very hot!",
            extremeHot: "☠️ Dangerously hot!",
        },
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    }
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
        try { return JSON.parse(localStorage.getItem('weatherFavs')) || ['Toshkent', 'London', 'Tokyo']; }
        catch { return ['Toshkent', 'London', 'Tokyo']; }
    });
    const [activeTab, setActiveTab] = useState('today');
    const [showFavorites, setShowFavorites] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // ===== EKRAN O'LCHAMI HOLATI =====
    const getScreenSize = (w) => {
        if (w < 480) return 'mobile';      // telefon
        if (w < 768) return 'tablet';       // planshet
        if (w < 1024) return 'laptop';      // noutbuk
        if (w < 1440) return 'desktop';     // desktop
        return 'large';                      // katta monitor
    };

    const [screenSize, setScreenSize] = useState(() => getScreenSize(window.innerWidth));

    useEffect(() => {
        const handleResize = () => setScreenSize(getScreenSize(window.innerWidth));
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = screenSize === 'mobile';
    const isTablet = screenSize === 'tablet';
    const isLaptop = screenSize === 'laptop';
    const isDesktop = screenSize === 'desktop';
    const isLarge = screenSize === 'large';
    const isSmallScreen = isMobile || isTablet;
    const isMediumScreen = isLaptop;
    const isBigScreen = isDesktop || isLarge;

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
            setMobileMenuOpen(false);
        }
    }, [t.notFound]);

    useEffect(() => { fetchWeather("Tashkent"); }, []);
    useEffect(() => { localStorage.setItem('weatherLang', language); }, [language]);
    useEffect(() => { localStorage.setItem('weatherFavs', JSON.stringify(favorites)); }, [favorites]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (city) fetchWeather(city);
        }, 600000);
        return () => clearInterval(interval);
    }, [city, fetchWeather]);

    const getWeatherEmoji = (code) => {
        const c = parseInt(code);
        if (c <= 2) return '☀️'; if (c <= 5) return '⛅';
        if (c <= 8) return '🌧️'; if (c <= 11) return '❄️';
        if (c <= 14) return '⛈️'; if (c <= 17) return '🌨️';
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
        if (v <= 2) return t.low; if (v <= 5) return t.medium;
        if (v <= 7) return t.high; if (v <= 10) return t.veryHigh;
        return t.extreme;
    };

    const getAdvice = (code, temp) => {
        const celsius = parseInt(temp);
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

    const getDaylightDuration = (sunrise, sunset) => {
        try {
            const [sh, sm] = sunrise.split(':').map(Number);
            const [eh, em] = sunset.split(':').map(Number);
            let totalMin = (eh * 60 + em) - (sh * 60 + sm);
            if (totalMin < 0) totalMin += 24 * 60;
            return `${Math.floor(totalMin / 60)}s ${totalMin % 60}daq`;
        } catch { return 'N/A'; }
    };

    const getDayName = (dateStr, index) => {
        if (index === 0) return t.today;
        if (index === 1) return t.tomorrow;
        try { return t.shortDays[new Date(dateStr).getDay()]; }
        catch { return dateStr; }
    };

    const currentCondition = weather?.current_condition?.[0];
    const astronomy = weather?.weather?.[0]?.astronomy?.[0];

    // ===== GRID KONFIGURATSIYASI =====
    const getGridConfig = () => {
        if (isMobile || isTablet) return { columns: '1fr', showLeft: false, showRight: false, gap: '0' };
        if (isLaptop) return { columns: '220px 1fr', showLeft: true, showRight: false, gap: '14px' };
        if (isDesktop) return { columns: '250px 1fr 280px', showLeft: true, showRight: true, gap: '16px' };
        // large screen
        return { columns: '280px 1fr 320px', showLeft: true, showRight: true, gap: '20px' };
    };

    const gridConfig = getGridConfig();

    // ===== O'LCHAMLAR =====
    const sizes = {
        logoIcon: isMobile ? 32 : isTablet ? 38 : 44,
        logoFont: isMobile ? 16 : isTablet ? 18 : 22,
        titleFont: isMobile ? 14 : isTablet ? 16 : 18,
        iconBtn: isMobile ? 32 : isTablet ? 36 : 40,
        iconBtnFont: isMobile ? 13 : isTablet ? 14 : 16,
        searchFont: isMobile ? 13 : 14,
        searchPadding: isMobile ? '10px 12px 10px 36px' : '12px 14px 12px 40px',
        tabFont: isMobile ? 10 : isTablet ? 11 : 12,
        tabPadding: isMobile ? '7px 3px' : isTablet ? '8px 4px' : '9px 6px',
        heroPadding: isMobile ? '16px' : isTablet ? '20px' : '24px',
        heroEmoji: isMobile ? '48px' : isTablet ? '56px' : '64px',
        heroTemp: isMobile ? '44px' : isTablet ? '52px' : '60px',
        heroCity: isMobile ? '18px' : isTablet ? '20px' : '22px',
        infoGridCols: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        infoCardPadding: isMobile ? '10px 8px' : '12px 10px',
        infoIcon: isMobile ? '16px' : '20px',
        infoLabel: isMobile ? '7px' : '8px',
        infoValue: isMobile ? '12px' : '14px',
        mainPadding: isMobile ? '10px' : isTablet ? '14px' : '20px',
        maxWidth: isLarge ? '1400px' : '1200px',
        headerMargin: isMobile ? '10px' : isTablet ? '14px' : '20px',
    };

    // ===== STILLAR =====
    const styles = {
        container: {
            minHeight: "100vh",
            background: "linear-gradient(160deg, #0a0a1a 0%, #1a1a3e 30%, #0d1b2a 60%, #1b2838 100%)",
            fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
        },
        stars: {
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 0,
        },
        mainContent: {
            position: "relative", zIndex: 1,
            maxWidth: sizes.maxWidth, margin: "0 auto",
            padding: sizes.mainPadding,
            paddingBottom: isSmallScreen ? '80px' : '20px',
        },
        header: {
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: sizes.headerMargin,
            gap: "8px",
        },
        logo: {
            display: "flex", alignItems: "center", gap: isMobile ? '8px' : '10px',
            flexShrink: 0,
        },
        logoIcon: {
            width: sizes.logoIcon, height: sizes.logoIcon,
            borderRadius: isMobile ? "10px" : "12px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: sizes.logoFont + 'px',
            flexShrink: 0,
        },
        headerActions: {
            display: "flex", alignItems: "center", gap: isMobile ? '4px' : '8px',
            flexShrink: 0,
        },
        iconBtn: {
            width: sizes.iconBtn, height: sizes.iconBtn,
            borderRadius: isMobile ? "8px" : "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.05)", color: "#fff",
            fontSize: sizes.iconBtnFont + 'px', cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0,
        },
        langUnitGroup: {
            display: 'flex', gap: '3px',
            background: 'rgba(255,255,255,0.04)',
            borderRadius: isMobile ? '7px' : '8px',
            padding: '2px',
        },
        langUnitBtn: {
            padding: isMobile ? '4px 7px' : isTablet ? '4px 8px' : '5px 10px',
            borderRadius: isMobile ? '5px' : '6px',
            border: 'none',
            fontSize: isMobile ? '10px' : '11px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s',
        },
        sidePanel: {
            background: "rgba(20, 20, 50, 0.5)", backdropFilter: "blur(20px)",
            borderRadius: "16px", padding: isTablet ? "14px" : "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            height: "fit-content",
            position: "sticky",
            top: "20px",
            maxHeight: isDesktop || isLarge ? "calc(100vh - 40px)" : "auto",
            overflow: "auto",
        },
        panelTitle: {
            fontSize: isMobile ? "9px" : "10px",
            textTransform: "uppercase", letterSpacing: "1.5px",
            color: "rgba(255,255,255,0.4)", marginBottom: "12px", fontWeight: "700",
        },
        searchWrap: {
            position: "relative", marginBottom: "12px",
        },
        searchInput: {
            width: "100%", padding: sizes.searchPadding,
            borderRadius: isMobile ? "10px" : "12px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)", color: "#fff",
            fontSize: sizes.searchFont, outline: "none", boxSizing: "border-box",
            transition: "all 0.2s",
        },
        tabRow: {
            display: "flex", gap: "4px", background: "rgba(255,255,255,0.03)",
            borderRadius: isMobile ? "8px" : "10px", padding: "3px", marginBottom: "12px",
        },
        tab: {
            flex: 1, padding: sizes.tabPadding,
            borderRadius: isMobile ? "6px" : "8px", border: "none", cursor: "pointer",
            fontSize: sizes.tabFont, fontWeight: "600",
            transition: "all 0.2s", background: "transparent",
            color: "rgba(255,255,255,0.4)",
        },
        tabActive: {
            background: "rgba(99,102,241,0.3)", color: "#fff",
        },
        heroCard: {
            background: "linear-gradient(145deg, rgba(99,102,241,0.2), rgba(139,92,246,0.15))",
            borderRadius: isMobile ? "16px" : "20px",
            padding: sizes.heroPadding,
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "12px",
        },
        infoGrid: {
            display: "grid",
            gridTemplateColumns: sizes.infoGridCols,
            gap: isMobile ? "6px" : "8px",
            marginBottom: "12px",
        },
        infoCard: {
            background: "rgba(255,255,255,0.03)", borderRadius: isMobile ? "12px" : "14px",
            padding: sizes.infoCardPadding, textAlign: "center",
            border: "1px solid rgba(255,255,255,0.05)",
            transition: "all 0.2s", cursor: "default",
        },
        mobileMenu: {
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.95)", zIndex: 100,
            padding: "20px", overflow: "auto",
        },
        closeBtn: {
            position: "absolute", top: "16px", right: "16px",
            width: "40px", height: "40px", borderRadius: "50%",
            background: "rgba(255,255,255,0.1)", border: "none",
            color: "#fff", fontSize: "20px", cursor: "pointer",
        },
        bottomBar: {
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "rgba(10, 10, 30, 0.95)", backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex", justifyContent: "space-around",
            padding: "6px 0 10px", zIndex: 50,
        },
        bottomBarBtn: {
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "2px", background: "none", border: "none",
            color: "rgba(255,255,255,0.5)", fontSize: isMobile ? "9px" : "10px",
            cursor: "pointer", padding: "2px 6px",
            minWidth: isMobile ? "44px" : "50px",
        },
        favPanel: {
            position: 'fixed', bottom: '65px', left: 0, right: 0,
            background: 'rgba(10, 10, 30, 0.98)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.1)', padding: '16px',
            zIndex: 40, maxHeight: '45vh', overflow: 'auto',
            borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
        },
    };

    const btnHoverIn = (e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; };
    const btnHoverOut = (e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; };

    // Mobil menyu
    const renderMobileMenu = () => (
        <div style={styles.mobileMenu}>
            <button style={styles.closeBtn} onClick={() => setMobileMenuOpen(false)}>✕</button>
            <div style={{ maxWidth: "400px", margin: "60px auto 0" }}>
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={styles.panelTitle}>🌐 {t.language}</h3>
                    <div style={{ display: "flex", gap: "6px" }}>
                        {[
                            { code: 'uz', label: "O'zbek" },
                            { code: 'ru', label: 'Русский' },
                            { code: 'en', label: 'English' }
                        ].map(lang => (
                            <button key={lang.code} onClick={() => setLanguage(lang.code)}
                                style={{
                                    flex: 1, padding: "12px", borderRadius: "10px",
                                    border: "none", fontSize: "14px", fontWeight: "600",
                                    cursor: "pointer",
                                    background: language === lang.code ? '#6366f1' : 'rgba(255,255,255,0.05)',
                                    color: language === lang.code ? '#fff' : 'rgba(255,255,255,0.6)',
                                }}
                            >{lang.label}</button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3 style={styles.panelTitle}>📏 {t.units}</h3>
                    <div style={{ display: "flex", gap: "6px" }}>
                        {['C', 'F'].map(u => (
                            <button key={u} onClick={() => setUnit(u)}
                                style={{
                                    flex: 1, padding: "12px", borderRadius: "10px",
                                    border: "none", fontSize: "14px", fontWeight: "700",
                                    cursor: "pointer",
                                    background: unit === u ? '#6366f1' : 'rgba(255,255,255,0.05)',
                                    color: unit === u ? '#fff' : 'rgba(255,255,255,0.6)',
                                }}
                            >°{u}</button>
                        ))}
                    </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <h3 style={styles.panelTitle}>⭐ {t.favorites}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {favorites.map(fav => (
                            <button key={fav} onClick={() => fetchWeather(fav)}
                                style={{
                                    padding: "12px", borderRadius: "10px",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    background: city === fav ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                                    color: '#fff', fontSize: "14px", cursor: "pointer",
                                    textAlign: "left", fontWeight: "500",
                                }}
                            >📍 {fav}</button>
                        ))}
                        <button onClick={() => {
                            const newCity = prompt(t.addCity);
                            if (newCity && !favorites.includes(newCity)) setFavorites(prev => [...prev, newCity]);
                        }}
                            style={{
                                padding: "12px", borderRadius: "10px",
                                border: "1px dashed rgba(255,255,255,0.2)",
                                background: "transparent", color: 'rgba(255,255,255,0.5)',
                                fontSize: "13px", cursor: "pointer", marginTop: "4px",
                            }}
                        >+ {t.addCity}</button>
                    </div>
                </div>

                <button onClick={() => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(async (pos) => {
                            const res = await fetch(`https://wttr.in/${pos.coords.latitude},${pos.coords.longitude}?format=j1`);
                            const data = await res.json();
                            const nearest = data.nearest_area?.[0]?.areaName?.[0]?.value;
                            if (nearest) fetchWeather(nearest);
                        });
                    }
                }}
                    style={{
                        width: '100%', padding: "14px", borderRadius: "12px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: "rgba(255,255,255,0.05)", color: '#fff',
                        fontSize: "14px", fontWeight: "600", cursor: "pointer",
                    }}
                >📍 {t.location}</button>
            </div>
        </div>
    );

    // Chap panel
    const renderLeftPanel = () => (
        <div style={styles.sidePanel}>
            <div style={styles.panelTitle}>⭐ {t.favorites}</div>
            {favorites.map(fav => (
                <div key={fav} onClick={() => fetchWeather(fav)}
                    style={{
                        padding: isTablet ? '6px 8px' : '8px 10px',
                        borderRadius: '8px', cursor: 'pointer',
                        marginBottom: '3px', fontSize: isTablet ? '12px' : '13px', fontWeight: '500',
                        background: city === fav ? 'rgba(99,102,241,0.2)' : 'transparent',
                        color: city === fav ? '#fff' : 'rgba(255,255,255,0.55)',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => { if (city !== fav) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
                    onMouseLeave={(e) => { if (city !== fav) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; } }}
                >• {fav}</div>
            ))}
            <button onClick={() => {
                const newCity = prompt(t.addCity);
                if (newCity && !favorites.includes(newCity)) setFavorites(prev => [...prev, newCity]);
            }}
                style={{
                    width: '100%', padding: isTablet ? '6px' : '8px', borderRadius: '8px', marginTop: '6px',
                    border: '1px dashed rgba(255,255,255,0.15)', background: 'transparent',
                    color: 'rgba(255,255,255,0.4)', fontSize: isTablet ? '11px' : '12px', cursor: 'pointer',
                }}
            >+ {t.addCity}</button>
        </div>
    );

    // O'ng panel
    const renderRightPanel = () => (
        <div style={styles.sidePanel}>
            <div style={styles.panelTitle}>📋 {t.forecast}</div>
            {forecast?.slice(1, 6).map((day, i) => (
                <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: isDesktop ? '8px 0' : '7px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.03)'
                }}>
                    <span style={{ fontSize: isDesktop ? '12px' : '11px', opacity: 0.6, minWidth: '40px' }}>{getDayName(day.date, i + 1)}</span>
                    <span style={{ fontSize: isDesktop ? '16px' : '14px' }}>{getWeatherEmoji(day.hourly[0].weatherCode)}</span>
                    <span style={{ fontSize: isDesktop ? '12px' : '11px', fontWeight: '600' }}>
                        {convertTemp(day.maxtempC)}° <span style={{ opacity: 0.4 }}>{convertTemp(day.mintempC)}°</span>
                    </span>
                </div>
            ))}

            {astronomy && (
                <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: isDesktop ? '12px' : '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: isDesktop ? '18px' : '16px' }}>🌅</div>
                            <div style={{ fontSize: '8px', opacity: 0.4, margin: '2px 0' }}>{t.sunrise}</div>
                            <div style={{ fontSize: isDesktop ? '13px' : '12px', fontWeight: '700' }}>{astronomy.sunrise}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: isDesktop ? '18px' : '16px' }}>🌇</div>
                            <div style={{ fontSize: '8px', opacity: 0.4, margin: '2px 0' }}>{t.sunset}</div>
                            <div style={{ fontSize: isDesktop ? '13px' : '12px', fontWeight: '700' }}>{astronomy.sunset}</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '6px', fontSize: isDesktop ? '11px' : '10px', opacity: 0.5 }}>
                        ⏱️ {t.daylight}: {getDaylightDuration(astronomy.sunrise, astronomy.sunset)}
                    </div>
                </div>
            )}

            {currentCondition && (
                <div style={{ marginTop: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: isDesktop ? '12px' : '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: isDesktop ? '12px' : '11px' }}>
                        <span style={{ opacity: 0.5 }}>🌬️ {t.airQuality}</span>
                        <span style={{ fontWeight: '700' }}>{getAQI(currentCondition.air_quality || 45).emoji} {currentCondition.air_quality || '45'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: isDesktop ? '12px' : '11px', marginTop: '5px' }}>
                        <span style={{ opacity: 0.5 }}>☀️ {t.uvIndex}</span>
                        <span style={{ fontWeight: '700' }}>{getUVLevel(currentCondition.uvIndex || 0)} ({currentCondition.uvIndex || '0'})</span>
                    </div>
                </div>
            )}
        </div>
    );

    // Markaziy kontent
    const renderMainContent = () => (
        <>
            {/* Qidiruv */}
            <div style={styles.searchWrap}>
                <span style={{ position: "absolute", left: isMobile ? "12px" : "14px", top: "50%", transform: "translateY(-50%)", fontSize: isMobile ? "13px" : "14px", opacity: 0.4, pointerEvents: "none" }}>🔍</span>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchWeather(searchInput)}
                    placeholder={t.search}
                    style={styles.searchInput}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                />
            </div>

            {/* Tabs */}
            {!isSmallScreen && (
                <div style={styles.tabRow}>
                    {[
                        { key: 'today', icon: '📊', label: t.today },
                        { key: 'hourly', icon: '⏰', label: t.hourly },
                        { key: 'weekly', icon: '📅', label: t.weekly },
                    ].map(tab => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                            style={{
                                ...styles.tab,
                                ...(activeTab === tab.key ? styles.tabActive : {}),
                            }}
                        >{tab.icon} {tab.label}</button>
                    ))}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ width: '40px', height: '40px', margin: '0 auto 12px', border: '3px solid rgba(255,255,255,0.08)', borderTopColor: '#8b5cf6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <div style={{ opacity: 0.5, fontSize: '13px' }}>{t.loading}</div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px', padding: '12px', textAlign: 'center', fontSize: '13px', color: '#fca5a5', marginBottom: '12px' }}>
                    ⚠️ {error}
                </div>
            )}

            {/* Ob-havo */}
            {weather && !loading && (
                <>
                    {activeTab === 'today' && (
                        <>
                            <div style={styles.heroCard}>
                                <div style={{ fontSize: sizes.heroEmoji, marginBottom: '4px' }}>{getWeatherEmoji(currentCondition?.weatherCode)}</div>
                                <h2 style={{ fontSize: sizes.heroCity, fontWeight: '700', margin: '4px 0' }}>📍 {city}</h2>
                                <div style={{ opacity: 0.5, fontSize: isMobile ? '12px' : '13px', marginBottom: '8px' }}>{currentCondition?.weatherDesc?.[0]?.value}</div>
                                <div style={{ fontSize: sizes.heroTemp, fontWeight: '800', lineHeight: 1 }}>{convertTemp(currentCondition?.temp_C)}{tempUnit}</div>
                                <div style={{ opacity: 0.5, fontSize: isMobile ? '11px' : '12px', margin: '6px 0' }}>{t.feels} {convertTemp(currentCondition?.FeelsLikeC)}{tempUnit}</div>
                                <div style={{ display: 'inline-block', background: 'rgba(99,102,241,0.25)', borderRadius: '16px', padding: '6px 16px', fontSize: isMobile ? '10px' : '11px', fontWeight: '600', border: '1px solid rgba(99,102,241,0.3)', marginTop: '8px' }}>
                                    {getAdvice(currentCondition?.weatherCode, currentCondition?.temp_C)}
                                </div>
                            </div>

                            <div style={styles.infoGrid}>
                                {[
                                    { icon: '💧', label: t.humidity, val: currentCondition?.humidity + '%' },
                                    { icon: '💨', label: t.wind, val: currentCondition?.windspeedKmph + ' km/h' },
                                    { icon: '🌡️', label: t.pressure, val: currentCondition?.pressure + ' hPa' },
                                    { icon: '👁️', label: t.visibility, val: currentCondition?.visibility + ' km' },
                                ].map((item, i) => (
                                    <div key={i} style={styles.infoCard}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                    >
                                        <div style={{ fontSize: sizes.infoIcon, marginBottom: '3px' }}>{item.icon}</div>
                                        <div style={{ fontSize: sizes.infoLabel, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.35, marginBottom: '2px' }}>{item.label}</div>
                                        <div style={{ fontSize: sizes.infoValue, fontWeight: '700' }}>{item.val}</div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'hourly' && hourlyForecast && (
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: isMobile ? '12px' : '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h3 style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '600', margin: '0 0 12px' }}>⏰ {t.hourly} {t.forecast}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                                {hourlyForecast.map((h, i) => (
                                    <div key={i}>
                                        <div style={{ fontSize: isMobile ? '9px' : '10px', opacity: 0.4 }}>{(parseInt(h.time) || i * 3) + ':00'}</div>
                                        <div style={{ fontSize: isMobile ? '16px' : '18px', margin: '3px 0' }}>{getWeatherEmoji(h.weatherCode)}</div>
                                        <div style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: '600' }}>{convertTemp(h.tempC)}°</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'weekly' && forecast && (
                        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: isMobile ? '10px' : '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {forecast.map((day, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '8px 4px' : '10px 6px', borderBottom: i < forecast.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                                    <span style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: '500', minWidth: isMobile ? '45px' : '50px' }}>{getDayName(day.date, i)}</span>
                                    <span style={{ fontSize: isMobile ? '16px' : '18px' }}>{getWeatherEmoji(day.hourly[0].weatherCode)}</span>
                                    <span style={{ fontSize: isMobile ? '11px' : '12px' }}><span style={{ opacity: 0.4 }}>{convertTemp(day.mintempC)}°</span> / <span style={{ fontWeight: '700' }}>{convertTemp(day.maxtempC)}°</span></span>
                                </div>
                            ))}
                        </div>
                    )}

                    <button onClick={() => fetchWeather(city)}
                        style={{
                            width: '100%', padding: isMobile ? '10px' : '12px',
                            borderRadius: isMobile ? '10px' : '12px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.04)', color: '#fff',
                            fontSize: isMobile ? '12px' : '13px', fontWeight: '600',
                            cursor: 'pointer', marginTop: '12px', transition: 'all 0.2s',
                        }}
                        onMouseEnter={btnHoverIn}
                        onMouseLeave={btnHoverOut}
                    >🔄 {t.refresh}</button>
                </>
            )}
        </>
    );

    return (
        <div style={styles.container}>
            {/* Yulduzli fon */}
            <div style={styles.stars}>
                {[...Array(isLarge ? 100 : 60)].map((_, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        width: Math.random() * 2 + 1 + 'px',
                        height: Math.random() * 2 + 1 + 'px',
                        background: "#fff", borderRadius: "50%",
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        opacity: Math.random() * 0.5 + 0.2,
                        animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
                    }} />
                ))}
            </div>

            <div style={styles.mainContent}>
                {/* HEADER */}
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <div style={styles.logoIcon}>🌤️</div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: sizes.titleFont }}>{t.appName}</div>
                            {!isMobile && (
                                <div style={{ fontSize: '10px', opacity: 0.4 }}>
                                    {new Date().toLocaleDateString(language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US', {
                                        weekday: 'long', day: 'numeric', month: 'long'
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={styles.headerActions}>
                        {/* Katta ekran: til va birlik */}
                        {!isSmallScreen && (
                            <>
                                <div style={styles.langUnitGroup}>
                                    {['uz', 'ru', 'en'].map(lang => (
                                        <button key={lang} onClick={() => setLanguage(lang)}
                                            style={{
                                                ...styles.langUnitBtn,
                                                background: language === lang ? '#6366f1' : 'transparent',
                                                color: language === lang ? '#fff' : 'rgba(255,255,255,0.5)',
                                            }}
                                        >{lang === 'uz' ? "O'Z" : lang === 'ru' ? 'РУ' : 'EN'}</button>
                                    ))}
                                </div>
                                <div style={styles.langUnitGroup}>
                                    {['C', 'F'].map(u => (
                                        <button key={u} onClick={() => setUnit(u)}
                                            style={{
                                                ...styles.langUnitBtn,
                                                background: unit === u ? '#6366f1' : 'transparent',
                                                color: unit === u ? '#fff' : 'rgba(255,255,255,0.5)',
                                                fontWeight: '700',
                                            }}
                                        >°{u}</button>
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Kichik ekran: menyu */}
                        {isSmallScreen ? (
                            <button style={styles.iconBtn} onClick={() => setMobileMenuOpen(true)}>☰</button>
                        ) : (
                            !isLarge && (
                                <button style={styles.iconBtn} onClick={() => setShowFavorites(!showFavorites)} title={t.favorites}>⭐</button>
                            )
                        )}
                        <button style={styles.iconBtn} onClick={() => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(async (pos) => {
                                    const res = await fetch(`https://wttr.in/${pos.coords.latitude},${pos.coords.longitude}?format=j1`);
                                    const data = await res.json();
                                    const nearest = data.nearest_area?.[0]?.areaName?.[0]?.value;
                                    if (nearest) fetchWeather(nearest);
                                });
                            }
                        }} title={t.location}>📍</button>
                    </div>
                </div>

                {/* ASOSIY GRID */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: gridConfig.columns,
                    gap: gridConfig.gap,
                }}>
                    {gridConfig.showLeft && renderLeftPanel()}
                    <div>{renderMainContent()}</div>
                    {gridConfig.showRight && renderRightPanel()}
                </div>

                {/* Mobil pastki bar */}
                {isSmallScreen && (
                    <div style={styles.bottomBar}>
                        <button style={styles.bottomBarBtn} onClick={() => setActiveTab('today')}>
                            <span style={{ fontSize: isMobile ? '16px' : '18px' }}>📊</span>
                            <span style={{ color: activeTab === 'today' ? '#fff' : undefined }}>{t.today}</span>
                        </button>
                        <button style={styles.bottomBarBtn} onClick={() => setActiveTab('hourly')}>
                            <span style={{ fontSize: isMobile ? '16px' : '18px' }}>⏰</span>
                            <span style={{ color: activeTab === 'hourly' ? '#fff' : undefined }}>{t.hourly}</span>
                        </button>
                        <button style={styles.bottomBarBtn} onClick={() => setActiveTab('weekly')}>
                            <span style={{ fontSize: isMobile ? '16px' : '18px' }}>📅</span>
                            <span style={{ color: activeTab === 'weekly' ? '#fff' : undefined }}>{t.weekly}</span>
                        </button>
                        <button style={styles.bottomBarBtn} onClick={() => setShowFavorites(!showFavorites)}>
                            <span style={{ fontSize: isMobile ? '16px' : '18px' }}>⭐</span>
                            <span>{t.favorites}</span>
                        </button>
                        <button style={styles.bottomBarBtn} onClick={() => setMobileMenuOpen(true)}>
                            <span style={{ fontSize: isMobile ? '16px' : '18px' }}>⚙️</span>
                            <span>{t.settings}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Mobil menyu overlay */}
            {isSmallScreen && mobileMenuOpen && renderMobileMenu()}

            {/* Mobil sevimlilar paneli */}
            {isSmallScreen && showFavorites && (
                <div style={styles.favPanel}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontWeight: '700', fontSize: '16px' }}>⭐ {t.favorites}</span>
                        <button onClick={() => setShowFavorites(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}>✕</button>
                    </div>
                    {forecast?.slice(1, 5).map((day, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: '13px' }}>{getDayName(day.date, i + 1)}</span>
                            <span>{getWeatherEmoji(day.hourly[0].weatherCode)}</span>
                            <span style={{ fontWeight: '600', fontSize: '13px' }}>{convertTemp(day.maxtempC)}° / <span style={{ opacity: 0.4 }}>{convertTemp(day.mintempC)}°</span></span>
                        </div>
                    ))}
                    {favorites.map(fav => (
                        <button key={fav} onClick={() => { fetchWeather(fav); setShowFavorites(false); }}
                            style={{
                                width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px',
                                background: city === fav ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.08)', color: '#fff',
                                fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                            }}
                        >📍 {fav}</button>
                    ))}
                </div>
            )}

            <style>{`
                @keyframes twinkle { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.8; } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes spin { to { transform: rotate(360deg); } }
                
                * { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.08) transparent; }
                ::-webkit-scrollbar { width: 3px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
                
                @media (min-width: 1440px) {
                    .side-panel { max-height: calc(100vh - 40px); overflow-y: auto; }
                }
            `}</style>
        </div>
    );
}

export default WeatherApp;
