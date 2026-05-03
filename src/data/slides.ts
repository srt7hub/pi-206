import {
  BrainCircuit,
  CalendarDays,
  Key,
  Sparkles,
  Zap,
  TrendingUp,
  Target,
  ShieldCheck,
  CheckCircle2,
  Users,
  Briefcase,
  Layers,
  MapPin,
  Clock,
  PieChart,
  DollarSign,
  BarChart4
} from 'lucide-react';
import React from 'react';

export type SlideType = 'hero' | 'problem' | 'solution' | 'modules' | 'steps' | 'market' | 'pricing' | 'timeline' | 'team' | 'financial' | 'contact';

export interface SlideData {
  id: string;
  type: SlideType;
  title?: string;
  subtitle?: string;
  content?: string[];
  metrics?: { label: string; value: string; icon?: string }[];
  aiHint: string;
  footer?: string;
  items?: any[];
}

export const slides: SlideData[] = [
  {
    id: 'intro',
    type: 'hero',
    title: 'RentAI',
    subtitle: 'ИИ-автоматизация арендного бизнеса.',
    content: ['Платформа нового поколения для аренды недвижимости.', 'Автоматизируйте 80% рутины с помощью искусственного интеллекта.'],
    metrics: [
      { value: '< 2 сек', label: 'ответ ИИ' },
      { value: '95%+', label: 'точность' },
      { value: '80%', label: 'экономия времени' }
    ],
    aiHint: 'Начните с сильного заявления. Сделайте паузу после цифры "80% экономии времени".',
    footer: 'Код проекта: RentAI-2026. Уфа, 2026.'
  },
  {
    id: 'problem',
    type: 'problem',
    title: 'Проблема Рынка: Хаос и Рутина',
    subtitle: 'Арендодатели тратят 80% времени на рутину, что блокирует рост прибыли.',
    content: [
      'Часы на переписку с клиентами',
      'Овербукинг и двойные бронирования',
      'Проблемы с заселением и передачей ключей',
      'Хаос в организации клининга'
    ],
    metrics: [
      { value: '8–10 млн', label: 'квартир сдаётся в РФ ежегодно' }
    ],
    aiHint: 'Обратитесь к боли аудитории. Спросите: "Кто из вас сталкивался с проблемами при заселении?"'
  },
  {
    id: 'solution',
    type: 'solution',
    title: 'Решение: Умная платформа',
    subtitle: 'RentAI работает вместо вас 24/7.',
    items: [
      {
        title: 'Без RentAI',
        points: ['Ручные ответы', 'Ручная синхронизация', 'Физическая передача ключей', 'Звонки уборщикам', 'Нет аналитики'],
        isNegative: true
      },
      {
        title: 'С RentAI',
        points: ['ИИ отвечает за 2 секунды 24/7', 'Автосинхронизация площадок', 'Умные замки и коды', 'Авто-задачи клининга', 'Дашборд KPI в реальном времени'],
        isNegative: false
      }
    ],
    aiHint: 'Сделайте акцент на контрасте. Покажите, как RentAI снимает головную боль.'
  },
  {
    id: 'modules',
    type: 'modules',
    title: 'Продукт — 5 модулей',
    subtitle: 'Экосистема для полного цикла управления.',
    items: [
      { title: 'RentAI Chat', desc: 'ИИ-ассистент в Телеграм, Ватсап, ВКонтакте.', icon: 'BrainCircuit' },
      { title: 'RentAI Calendar', desc: 'Единый календарь: Циан, Авито, Airbnb, Booking.', icon: 'CalendarDays' },
      { title: 'RentAI Access', desc: 'Умные замки, временные коды, без присутствия.', icon: 'Key' },
      { title: 'RentAI Cleaning', desc: 'Авто-задачи, маршруты, фотоотчёты.', icon: 'Sparkles' },
      { title: 'RentAI Analytics', desc: 'Дашборд KPI: доход, загрузка, ADR, RevPAR.', icon: 'PieChart' }
    ],
    aiHint: 'Пройдитесь по каждому модулю быстро. Подчеркните, что это единая система.'
  },
  {
    id: 'steps',
    type: 'steps',
    title: 'Как это работает',
    subtitle: 'Сделка от заявки до аналитики за 5 шагов.',
    items: [
      { step: 1, title: 'Запрос', desc: 'Запрос от арендатора.' },
      { step: 2, title: 'Ответ', desc: 'ИИ-ответ за 2 секунды, квалификация лида.' },
      { step: 3, title: 'Бронь', desc: 'Авто-бронирование в едином календаре.' },
      { step: 4, title: 'Заселение', desc: 'Временный код на умный замок автоматически.' },
      { step: 5, title: 'Анализ', desc: 'Аналитика и KPI в реальном времени.' }
    ],
    aiHint: 'Покажите простоту процесса. Из 5 шагов человек участвует только в настройке.'
  },
  {
    id: 'market',
    type: 'market',
    title: 'Рынок и Потенциал',
    subtitle: 'Огромный растущий рынок с низкой цифровизацией.',
    items: [
      { value: '1.2 трлн ₽', label: 'Объём рынка аренды в год', icon: 'DollarSign' },
      { value: '8–10 млн', label: 'Сдаваемых квартир', icon: 'Target' },
      { value: '< 20%', label: 'Уровень автоматизации', icon: 'TrendingUp' },
      { value: '+15–20%', label: 'Рост посуточной аренды', icon: 'Zap' }
    ],
    aiHint: 'Сфокусируйте внимание инвесторов на "менее 20% автоматизации" — это свободная ниша.'
  },
  {
    id: 'target',
    type: 'market', // reusing market layout
    title: 'Целевая аудитория',
    subtitle: '3.5 млн+ потенциальных арендодателей в России.',
    items: [
      { value: '25%', label: 'Малый бизнес (2–20 объектов)', icon: 'Users' },
      { value: '10%', label: 'Средний бизнес (20–100 объектов)', icon: 'Briefcase' },
      { value: '5%', label: 'Управляющие компании (100+)', icon: 'Layers' },
      { value: '3.5М+', label: 'Потенциальных клиентов', icon: 'Target' }
    ],
    aiHint: 'Объясните, что мы начинаем с малого бизнеса и масштабируемся в B2B.'
  },
  {
    id: 'pricing',
    type: 'pricing',
    title: 'Бизнес-модель',
    subtitle: 'SaaS-подписка с гибкими тарифами.',
    items: [
      { title: 'Старт', price: '0 ₽', desc: 'до 1 объекта', features: ['Базовый чат-бот', 'Ограниченная аналитика'] },
      { title: 'Базовый', price: '20 000 ₽', desc: 'до 5 объектов', features: ['Чат-бот 24/7', 'Синхронизация 2 площадок', 'Единый календарь'], highlight: true },
      { title: 'Стандарт', price: '40 000 ₽', desc: 'до 20 объектов', features: ['Все интеграции', 'Умные замки', 'Клининг-менеджмент', 'Приоритетная поддержка'] },
      { title: 'Премиум', price: '60 000 ₽', desc: 'до 100 объектов', features: ['API', 'Персональный менеджер', 'Кастомизация ИИ'] }
    ],
    footer: 'Единоразовое подключение 100 000 ₽. Корпоративный тариф индивидуально.',
    aiHint: 'Отметьте "Базовый" как самый популярный тариф для входа.'
  },
  {
    id: 'timeline',
    type: 'timeline',
    title: 'Трекшн и план',
    subtitle: 'От MVP до масштабирования.',
    items: [
      { date: 'Янв–Авг 2026', title: 'Разработка MVP' },
      { date: 'Сент–Окт 2026', title: 'Пилот', target: '10–15 клиентов' },
      { date: 'Дек 2026', title: 'Запуск', target: '30+ клиентов' },
      { date: 'Март 2027', title: 'Безубыточность', target: '56 клиентов' },
      { date: 'Дек 2027', title: 'Масштаб', target: '500+ клиентов' }
    ],
    aiHint: 'Покажите уверенность в марте 2027 года — точке безубыточности.'
  },
  {
    id: 'advantages',
    type: 'problem',
    title: 'Конкурентные преимущества',
    subtitle: 'Почему выбирают RentAI?',
    content: [
      'ИИ нового поколения (GPT-4 + Claude, точность >95%)',
      'Комплексность: весь цикл от заявки до аналитики',
      'Российская специфика (Циан, Авито, Яндекс, 152-ФЗ)',
      'Модульная архитектура',
      'Скорость внедрения — настройка за 1 день',
      'ROI на первом месяце (экономия 80% времени)'
    ],
    aiHint: 'Сделайте упор на объединение лучших ИИ-моделей и соответствие ФЗ-152.'
  },
  {
    id: 'financial',
    type: 'market',
    title: 'Unit-экономика и Финансы',
    subtitle: 'Твердая математика и быстрый выход на окупаемость.',
    items: [
      { value: '285%', label: 'Внутренняя норма доходности (IRR)', icon: 'TrendingUp' },
      { value: '14 мес', label: 'Срок окупаемости', icon: 'Clock' },
      { value: '75%', label: 'Маржинальность (LTV / CAC)', icon: 'BarChart4' },
      { value: '357 млн ₽', label: 'NPV (за 3 года)', icon: 'DollarSign' }
    ],
    aiHint: 'Эти цифры говорят сами за себя. Инвесторам понравится IRR и высокая маржинальность.'
  },
  {
    id: 'investment_offer',
    type: 'market',
    title: 'Инвестиционное предложение',
    subtitle: 'Ищем стратегического партнера',
    items: [
      { value: '12.5 млн ₽', label: 'Необходимые инвестиции (Seed-раунд)', icon: 'Target' },
      { value: '10-15%', label: 'Доля инвестора в компании', icon: 'PieChart' },
      { value: '80% IT', label: 'Распределение (Разработка и R&D)', icon: 'BrainCircuit' },
      { value: '20% GTM', label: 'Распределение (Маркетинг и продажи)', icon: 'Zap' }
    ],
    aiHint: 'Четко озвучьте сумму (12.5 млн) и куда пойдут деньги: команда и быстрый захват рынка.'
  },
  {
    id: 'team',
    type: 'team',
    title: 'Команда',
    subtitle: 'Эксперты на стыке IT и недвижимости.',
    items: [
      { name: 'Саитгалин Р.Т.', role: 'CEO / Руководитель проекта' },
      { name: 'Рахимкулов А.З.', role: 'CTO / Технический директор' },
      { name: 'Ибрагимов А.А.', role: 'CCO / Коммерческий директор' },
      { name: 'Шмелев Л.Ю.', role: 'PM / Менеджер продукта' }
    ],
    aiHint: 'Представьте команду с гордостью. Обязательно упомяните поддержку УУНиТ.'
  },
  {
    id: 'contact',
    type: 'contact',
    title: 'Давайте менять рынок вместе',
    subtitle: 'RentAI делает аренду невидимой для владельца и идеальной для гостя.',
    content: [
      'Готовы обсудить условия Seed-раунда',
      'Открыты к партнерству с управляющими компаниями',
      'Продукт на стадии готовности к пилоту'
    ],
    footer: 'invest@rentai.ru | www.rentai.ru | +7 (999) 000-00-00\nRentAI-2026, УУНиТ',
    aiHint: 'Завершите презентацию предложением встретиться 1-на-1 для обсуждения сделки.'
  }
];
