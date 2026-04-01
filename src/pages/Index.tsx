import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import {
  UserPrefs, DrinkMatch, HistoryItem,
  matchDrinks, isDishRecognized, AlcoholType, Sweetness, Body, Budget
} from '@/data';

const LS_PREFS = 'winemate_prefs';
const LS_HISTORY = 'winemate_history';
const LS_FAVORITES = 'winemate_favorites';

type Screen = 'onboarding' | 'home' | 'result' | 'favorites' | 'settings';

const ONBOARDING_QUESTIONS = [
  {
    id: 'alcoholType',
    title: 'Какой алкоголь предпочитаете?',
    subtitle: 'Мы подберём именно то, что вам по душе',
    options: [
      { value: 'red', label: '🍷 Красное вино' },
      { value: 'white', label: '🥂 Белое вино' },
      { value: 'sparkling', label: '🍾 Игристое' },
      { value: 'strong', label: '🥃 Крепкий алкоголь' },
      { value: 'any', label: '✨ Любой' },
    ],
  },
  {
    id: 'sweetness',
    title: 'По сладости?',
    subtitle: 'Это поможет нам точнее угадать ваш вкус',
    options: [
      { value: 'dry', label: 'Сухое' },
      { value: 'semidry', label: 'Полусухое' },
      { value: 'semisweet', label: 'Полусладкое' },
      { value: 'sweet', label: 'Сладкое' },
      { value: 'any', label: 'Не важно' },
    ],
  },
  {
    id: 'body',
    title: 'По плотности / телу?',
    subtitle: 'Насколько насыщенным должен быть напиток',
    options: [
      { value: 'light', label: 'Лёгкое' },
      { value: 'medium', label: 'Среднее' },
      { value: 'full', label: 'Насыщенное' },
      { value: 'any', label: 'Не важно' },
    ],
  },
  {
    id: 'budget',
    title: 'Бюджет на бутылку?',
    subtitle: 'Мы найдём лучшее в вашем ценовом диапазоне',
    options: [
      { value: 'under1k', label: 'До 1 000 ₽' },
      { value: '1k-3k', label: '1 000 – 3 000 ₽' },
      { value: '3k-5k', label: '3 000 – 5 000 ₽' },
      { value: 'unlimited', label: 'Без ограничений' },
    ],
  },
  {
    id: 'favorites',
    title: 'Любимые сорта или марки?',
    subtitle: 'Необязательно — но поможет нам угадать точнее',
    isText: true,
    placeholder: 'Например: Шардоне, Кьянти, Moёt…',
  },
];

function loadPrefs(): UserPrefs | null {
  try {
    const raw = localStorage.getItem(LS_PREFS);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function savePrefs(prefs: UserPrefs) {
  localStorage.setItem(LS_PREFS, JSON.stringify(prefs));
}

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(LS_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveHistory(items: HistoryItem[]) {
  localStorage.setItem(LS_HISTORY, JSON.stringify(items));
}

function loadFavorites(): DrinkMatch[] {
  try {
    const raw = localStorage.getItem(LS_FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveFavorites(items: DrinkMatch[]) {
  localStorage.setItem(LS_FAVORITES, JSON.stringify(items));
}

function OrnamentDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 gold-divider" />
      <span className="ornament text-sm opacity-40">✦</span>
      <div className="flex-1 gold-divider" />
    </div>
  );
}

function DrinkCard({
  match, onFavorite, onReject, isFavorited, showActions = true
}: {
  match: DrinkMatch;
  onFavorite?: () => void;
  onReject?: () => void;
  isFavorited?: boolean;
  showActions?: boolean;
}) {
  const { drink, reason } = match;
  return (
    <div className="wine-card p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{drink.emoji}</span>
            <h3 className="text-display text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
              {drink.name}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="wine-badge">{drink.category}</span>
            <span className="gold-badge">{drink.priceLabel}</span>
          </div>
        </div>
      </div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {drink.description}
      </p>
      <div
        className="rounded-lg p-3 mb-4 text-sm italic leading-relaxed"
        style={{
          background: 'rgba(201, 168, 76, 0.06)',
          borderLeft: '2px solid rgba(201, 168, 76, 0.3)',
          color: 'var(--gold-light)',
        }}
      >
        «{reason}»
      </div>
      {showActions && (
        <div className="flex gap-2">
          {onFavorite && (
            <button
              className={isFavorited ? 'btn-gold flex-1' : 'btn-ghost flex-1'}
              onClick={onFavorite}
            >
              <Icon name="Heart" size={16} />
              {isFavorited ? 'В избранном' : 'В избранное'}
            </button>
          )}
          {onReject && (
            <button className="btn-ghost" onClick={onReject} title="Предложить другой вариант">
              <Icon name="RefreshCw" size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [screen, setScreen] = useState<Screen>('home');
  const [prefs, setPrefs] = useState<UserPrefs | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<Partial<UserPrefs>>({});
  const [dish, setDish] = useState('');
  const [matches, setMatches] = useState<DrinkMatch[]>([]);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<DrinkMatch[]>([]);
  const [notRecognized, setNotRecognized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const savedPrefs = loadPrefs();
    const savedHistory = loadHistory();
    const savedFavorites = loadFavorites();
    setHistory(savedHistory);
    setFavorites(savedFavorites);
    if (savedPrefs) {
      setPrefs(savedPrefs);
      setScreen('home');
    } else {
      setScreen('onboarding');
    }
  }, []);

  const handleOnboardingOption = (value: string) => {
    const q = ONBOARDING_QUESTIONS[onboardingStep];
    setOnboardingData(prev => ({ ...prev, [q.id]: value }));
    if (onboardingStep < ONBOARDING_QUESTIONS.length - 1) {
      setTimeout(() => {
        setOnboardingStep(prev => prev + 1);
        setAnimKey(k => k + 1);
      }, 180);
    }
  };

  const handleOnboardingText = (value: string) => {
    const q = ONBOARDING_QUESTIONS[onboardingStep];
    setOnboardingData(prev => ({ ...prev, [q.id]: value }));
  };

  const handleOnboardingFinish = () => {
    const newPrefs: UserPrefs = {
      alcoholType: (onboardingData.alcoholType as AlcoholType) || 'any',
      sweetness: (onboardingData.sweetness as Sweetness) || 'any',
      body: (onboardingData.body as Body) || 'any',
      budget: (onboardingData.budget as Budget) || '1k-3k',
      favorites: (onboardingData.favorites as string) || '',
    };
    setPrefs(newPrefs);
    savePrefs(newPrefs);
    setScreen('home');
  };

  const handleMatch = useCallback(() => {
    if (!dish.trim() || !prefs) return;
    setLoading(true);
    setNotRecognized(false);
    setExcludedIds([]);

    setTimeout(() => {
      if (!isDishRecognized(dish)) {
        setNotRecognized(true);
        setLoading(false);
        return;
      }
      const results = matchDrinks(dish, prefs, []);
      setMatches(results);
      setScreen('result');
      setAnimKey(k => k + 1);

      const item: HistoryItem = {
        id: Date.now().toString(),
        dish,
        matches: results,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }),
      };
      const newHistory = [item, ...history].slice(0, 10);
      setHistory(newHistory);
      saveHistory(newHistory);
      setLoading(false);
    }, 600);
  }, [dish, prefs, history]);

  const handleReject = (drinkId: string) => {
    if (!prefs) return;
    const newExcluded = [...excludedIds, drinkId];
    setExcludedIds(newExcluded);
    const newResults = matchDrinks(dish, prefs, newExcluded);
    setMatches(prev => {
      const filtered = prev.filter(m => m.drink.id !== drinkId);
      const replacement = newResults.find(r => !prev.find(p => p.drink.id === r.drink.id));
      if (replacement) return [...filtered, replacement];
      return filtered;
    });
  };

  const handleFavorite = (match: DrinkMatch) => {
    const already = favorites.find(f => f.drink.id === match.drink.id);
    let newFavs: DrinkMatch[];
    if (already) {
      newFavs = favorites.filter(f => f.drink.id !== match.drink.id);
    } else {
      newFavs = [match, ...favorites];
    }
    setFavorites(newFavs);
    saveFavorites(newFavs);
  };

  const handleSaveSettings = (newPrefs: UserPrefs) => {
    setPrefs(newPrefs);
    savePrefs(newPrefs);
    setScreen('home');
  };

  const handleRestartOnboarding = () => {
    setOnboardingStep(0);
    setOnboardingData({});
    setAnimKey(k => k + 1);
    setScreen('onboarding');
  };

  if (screen === 'onboarding') {
    return (
      <OnboardingScreen
        step={onboardingStep}
        animKey={animKey}
        onboardingData={onboardingData}
        onOption={handleOnboardingOption}
        onText={handleOnboardingText}
        onFinish={handleOnboardingFinish}
        onBack={() => {
          if (onboardingStep > 0) {
            setOnboardingStep(p => p - 1);
            setAnimKey(k => k + 1);
          }
        }}
      />
    );
  }

  if (screen === 'result') {
    return (
      <ResultScreen
        key={animKey}
        dish={dish}
        matches={matches}
        favorites={favorites}
        onFavorite={handleFavorite}
        onReject={handleReject}
        onBack={() => setScreen('home')}
        onFavoritesNav={() => setScreen('favorites')}
      />
    );
  }

  if (screen === 'favorites') {
    return (
      <FavoritesScreen
        favorites={favorites}
        onFavorite={handleFavorite}
        onBack={() => setScreen('home')}
      />
    );
  }

  if (screen === 'settings') {
    return (
      <SettingsScreen
        prefs={prefs!}
        onSave={handleSaveSettings}
        onBack={() => setScreen('home')}
        onRestartOnboarding={handleRestartOnboarding}
      />
    );
  }

  return (
    <HomeScreen
      dish={dish}
      setDish={setDish}
      onMatch={handleMatch}
      history={history}
      loading={loading}
      notRecognized={notRecognized}
      onHistoryClick={(item) => {
        setDish(item.dish);
        setMatches(item.matches);
        setExcludedIds([]);
        setScreen('result');
        setAnimKey(k => k + 1);
      }}
      onFavorites={() => setScreen('favorites')}
      onSettings={() => setScreen('settings')}
      favoritesCount={favorites.length}
    />
  );
}

function OnboardingScreen({
  step, animKey, onboardingData, onOption, onText, onFinish, onBack
}: {
  step: number;
  animKey: number;
  onboardingData: Partial<UserPrefs>;
  onOption: (v: string) => void;
  onText: (v: string) => void;
  onFinish: () => void;
  onBack: () => void;
}) {
  const q = ONBOARDING_QUESTIONS[step];
  const isLast = step === ONBOARDING_QUESTIONS.length - 1;
  const currentValue = (onboardingData[q.id as keyof UserPrefs] as string) || '';
  const progress = ((step + 1) / ONBOARDING_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,33,53,0.12) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-10 max-w-md mx-auto w-full">
        <div className="w-full mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {step + 1} / {ONBOARDING_QUESTIONS.length}
            </span>
            {step > 0 && (
              <button className="btn-ghost py-1 px-3 text-xs" onClick={onBack}>
                ← Назад
              </button>
            )}
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div key={animKey} className="w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{step === 0 ? '🍷' : step === 1 ? '🍬' : step === 2 ? '⚖️' : step === 3 ? '💰' : '❤️'}</div>
            <h2
              className="text-display font-light mb-2"
              style={{ color: 'var(--text-primary)', fontSize: '26px', lineHeight: 1.3 }}
            >
              {q.title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{q.subtitle}</p>
          </div>

          {q.isText ? (
            <div className="space-y-4">
              <textarea
                className="input-wine"
                rows={3}
                placeholder={q.placeholder}
                value={currentValue}
                onChange={e => onText(e.target.value)}
              />
              <button className="btn-wine w-full justify-center" onClick={onFinish}>
                Начать подбирать ✨
              </button>
              <button
                className="btn-ghost w-full justify-center text-sm"
                onClick={onFinish}
              >
                Пропустить
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {q.options!.map(opt => (
                <button
                  key={opt.value}
                  className={`option-card ${currentValue === opt.value ? 'selected' : ''}`}
                  onClick={() => onOption(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
              {isLast && currentValue && (
                <button className="btn-wine w-full justify-center mt-2" onClick={onFinish}>
                  Начать подбирать ✨
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HomeScreen({
  dish, setDish, onMatch, history, loading, notRecognized,
  onHistoryClick, onFavorites, onSettings, favoritesCount
}: {
  dish: string;
  setDish: (v: string) => void;
  onMatch: () => void;
  history: HistoryItem[];
  loading: boolean;
  notRecognized: boolean;
  onHistoryClick: (item: HistoryItem) => void;
  onFavorites: () => void;
  onSettings: () => void;
  favoritesCount: number;
}) {
  const recent = history.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(139,33,53,0.18) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto w-full px-5 py-8 flex flex-col min-h-screen">
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1
              className="text-display font-light"
              style={{ fontSize: '32px', color: 'var(--text-primary)', lineHeight: 1.1 }}
            >
              Wine<span style={{ color: 'var(--gold)' }}>Mate</span>
            </h1>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Ваш персональный сомелье
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn-ghost py-2 px-3 relative"
              onClick={onFavorites}
              title="Избранное"
            >
              <Icon name="Heart" size={18} />
              {favoritesCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: 'var(--wine)', color: 'white', fontSize: '10px' }}
                >
                  {favoritesCount}
                </span>
              )}
            </button>
            <button className="btn-ghost py-2 px-3" onClick={onSettings} title="Настройки">
              <Icon name="Settings2" size={18} />
            </button>
          </div>
        </header>

        <div className="wine-card p-6 mb-6 animate-fade-in stagger-1">
          <p className="text-sm mb-3 font-medium" style={{ color: 'var(--gold)' }}>
            🍽️ Что у вас на ужине?
          </p>
          <textarea
            className="input-wine mb-4"
            rows={3}
            placeholder="Например: стейк рибай, лосось с лимоном, паста карбонара, том ям…"
            value={dish}
            onChange={e => setDish(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) onMatch();
            }}
          />
          {notRecognized && (
            <div
              className="rounded-lg p-3 mb-4 text-sm"
              style={{
                background: 'rgba(139,33,53,0.12)',
                border: '1px solid rgba(139,33,53,0.3)',
                color: '#E87090',
              }}
            >
              🤔 Не знаем такое блюдо. Опишите подробнее: мясо, рыба, овощи?
            </div>
          )}
          <button
            className="btn-wine w-full justify-center"
            onClick={onMatch}
            disabled={!dish.trim() || loading}
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                Подбираем…
              </>
            ) : (
              '🍷 Подобрать напиток'
            )}
          </button>
        </div>

        {recent.length > 0 && (
          <div className="animate-fade-in stagger-2">
            <OrnamentDivider />
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-display text-lg font-light" style={{ color: 'var(--text-secondary)' }}>
                Недавние подборы
              </h2>
            </div>
            <div className="space-y-2">
              {recent.map((item, i) => (
                <button
                  key={item.id}
                  className="wine-card w-full p-4 text-left"
                  style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                  onClick={() => onHistoryClick(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                        {item.dish}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {item.matches.slice(0, 2).map(m => m.drink.name).join(', ')} • {item.date}
                      </p>
                    </div>
                    <Icon name="ChevronRight" size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 } as React.CSSProperties} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-8 text-center">
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            WineMate • 30+ напитков в базе
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultScreen({
  dish, matches, favorites, onFavorite, onReject, onBack, onFavoritesNav
}: {
  dish: string;
  matches: DrinkMatch[];
  favorites: DrinkMatch[];
  onFavorite: (m: DrinkMatch) => void;
  onReject: (id: string) => void;
  onBack: () => void;
  onFavoritesNav: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(139,33,53,0.12) 0%, transparent 60%)',
          zIndex: 0,
        }}
      />
      <div className="relative z-10 max-w-lg mx-auto w-full px-5 py-8">
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <button className="btn-ghost py-2 px-3 flex items-center gap-1" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
            <span>Назад</span>
          </button>
          <button className="btn-ghost py-2 px-3" onClick={onFavoritesNav}>
            <Icon name="Heart" size={16} />
          </button>
        </div>

        <div className="mb-6 animate-fade-in stagger-1">
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Блюдо</p>
          <h2
            className="text-display font-light"
            style={{ color: 'var(--text-primary)', fontSize: '26px' }}
          >
            {dish}
          </h2>
        </div>

        <OrnamentDivider />

        {matches.length === 0 ? (
          <div className="wine-card p-6 text-center mt-4">
            <p className="text-4xl mb-3">🍾</p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Все варианты исчерпаны. Попробуйте изменить блюдо или настройки.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            {matches.map((match, i) => (
              <div key={match.drink.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <DrinkCard
                  match={match}
                  onFavorite={() => onFavorite(match)}
                  onReject={() => onReject(match.drink.id)}
                  isFavorited={!!favorites.find(f => f.drink.id === match.drink.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FavoritesScreen({
  favorites, onFavorite, onBack
}: {
  favorites: DrinkMatch[];
  onFavorite: (m: DrinkMatch) => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-lg mx-auto w-full px-5 py-8">
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <button className="btn-ghost py-2 px-3" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
          </button>
          <h1 className="text-display font-light text-2xl" style={{ color: 'var(--text-primary)' }}>
            Избранное
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="wine-card p-8 text-center animate-fade-in">
            <p className="text-5xl mb-4">🍷</p>
            <h3 className="text-display text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
              Пока пусто
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Сохраняйте понравившиеся напитки из результатов подбора
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((match, i) => (
              <div key={match.drink.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.07}s` }}>
                <DrinkCard
                  match={match}
                  onFavorite={() => onFavorite(match)}
                  isFavorited={true}
                  showActions={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsScreen({
  prefs, onSave, onBack, onRestartOnboarding
}: {
  prefs: UserPrefs;
  onSave: (p: UserPrefs) => void;
  onBack: () => void;
  onRestartOnboarding: () => void;
}) {
  const [local, setLocal] = useState<UserPrefs>({ ...prefs });

  const set = (key: keyof UserPrefs, value: string) => {
    setLocal(prev => ({ ...prev, [key]: value }));
  };

  const ALCOHOL_OPTIONS = [
    { value: 'red', label: '🍷 Красное вино' },
    { value: 'white', label: '🥂 Белое вино' },
    { value: 'sparkling', label: '🍾 Игристое' },
    { value: 'strong', label: '🥃 Крепкий' },
    { value: 'any', label: '✨ Любой' },
  ];
  const SWEETNESS_OPTIONS = [
    { value: 'dry', label: 'Сухое' },
    { value: 'semidry', label: 'Полусухое' },
    { value: 'semisweet', label: 'Полусладкое' },
    { value: 'sweet', label: 'Сладкое' },
    { value: 'any', label: 'Не важно' },
  ];
  const BODY_OPTIONS = [
    { value: 'light', label: 'Лёгкое' },
    { value: 'medium', label: 'Среднее' },
    { value: 'full', label: 'Насыщенное' },
    { value: 'any', label: 'Не важно' },
  ];
  const BUDGET_OPTIONS = [
    { value: 'under1k', label: 'До 1 000 ₽' },
    { value: '1k-3k', label: '1 000 – 3 000 ₽' },
    { value: '3k-5k', label: '3 000 – 5 000 ₽' },
    { value: 'unlimited', label: 'Без ограничений' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-lg mx-auto w-full px-5 py-8">
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <button className="btn-ghost py-2 px-3" onClick={onBack}>
            <Icon name="ArrowLeft" size={16} />
          </button>
          <h1 className="text-display font-light text-2xl" style={{ color: 'var(--text-primary)' }}>
            Мои предпочтения
          </h1>
        </div>

        <div className="space-y-6 animate-fade-in stagger-1">
          <SettingsBlock label="Алкоголь" options={ALCOHOL_OPTIONS} value={local.alcoholType} onChange={v => set('alcoholType', v)} />
          <SettingsBlock label="Сладость" options={SWEETNESS_OPTIONS} value={local.sweetness} onChange={v => set('sweetness', v)} />
          <SettingsBlock label="Плотность" options={BODY_OPTIONS} value={local.body} onChange={v => set('body', v)} />
          <SettingsBlock label="Бюджет" options={BUDGET_OPTIONS} value={local.budget} onChange={v => set('budget', v)} />

          <div className="wine-card p-4">
            <p className="text-sm mb-2 font-medium" style={{ color: 'var(--gold)' }}>Любимые сорта / марки</p>
            <textarea
              className="input-wine"
              rows={2}
              placeholder="Шардоне, Кьянти, Moёt…"
              value={local.favorites}
              onChange={e => set('favorites', e.target.value)}
            />
          </div>

          <button className="btn-wine w-full justify-center" onClick={() => onSave(local)}>
            Сохранить
          </button>

          <div className="gold-divider mt-2" />

          <button
            className="w-full py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-200"
            style={{
              background: 'transparent',
              border: '1px dashed rgba(201,168,76,0.2)',
              color: 'var(--text-muted)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.4)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.2)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
            }}
            onClick={onRestartOnboarding}
          >
            <Icon name="RotateCcw" size={14} />
            Пройти тест заново
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsBlock({
  label, options, value, onChange
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="wine-card p-4">
      <p className="text-sm mb-3 font-medium" style={{ color: 'var(--gold)' }}>{label}</p>
      <div className="grid grid-cols-2 gap-2">
        {options.map(opt => (
          <button
            key={opt.value}
            className={`option-card text-sm py-2 ${value === opt.value ? 'selected' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}