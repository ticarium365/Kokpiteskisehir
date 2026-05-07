import { useState, useMemo } from 'react';
import { Calendar, Clock, GraduationCap, Users, FileText, Award, Flag } from 'lucide-react';
import './AcademicCalendar.css';

const AcademicCalendar = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const events = [
    { date: '15 Haziran 2025', event: 'Bursluluk Sınav Başvuruları Başlıyor', type: 'basvuru' },
    { date: '20 Temmuz 2025', event: 'Bursluluk Sınavı', type: 'sinav' },
    { date: '1 Eylül 2025', event: 'Yeni Eğitim-Öğretim Yılı Başlangıcı', type: 'egitim' },
    { date: '15 Eylül 2025', event: 'Veli Toplantısı', type: 'toplanti' },
    { date: '23 Ekim 2025', event: 'Cumhuriyet Bayramı Kutlaması', type: 'etkinlik' },
    { date: '14 Kasım 2025', event: 'Atatürk\'ü Anma Töreni', type: 'toren' },
    { date: '10 Aralık 2025', event: '1. Dönem Sınavları Başlıyor', type: 'sinav' },
    { date: '20 Ocak 2026', event: 'Karneler Dağıtılıyor', type: 'egitim' },
    { date: '3 Şubat 2026', event: 'Yarıyul Tatili Başlıyor', type: 'egitim' },
    { date: '17 Şubat 2026', event: '2. Dönem Başlıyor', type: 'egitim' },
    { date: '15 Mart 2026', event: 'Bahar Şenliği', type: 'etkinlik' },
    { date: '23 Nisan 2026', event: 'Ulusal Egemenlik ve Çocuk Bayramı', type: 'etkinlik' },
    { date: '19 Mayıs 2026', event: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', type: 'toren' },
    { date: '1 Haziran 2026', event: 'Yaz Okulu Kayıtları Başlıyor', type: 'basvuru' },
  ];

  const filters = [
    { id: 'all', label: 'Tümü' },
    { id: 'basvuru', label: 'Başvuru' },
    { id: 'sinav', label: 'Sınav' },
    { id: 'etkinlik', label: 'Etkinlik' },
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'basvuru':
        return <FileText size={20} />;
      case 'sinav':
        return <GraduationCap size={20} />;
      case 'egitim':
        return <Calendar size={20} />;
      case 'toplanti':
        return <Users size={20} />;
      case 'etkinlik':
        return <Award size={20} />;
      case 'toren':
        return <Flag size={20} />;
      default:
        return <Calendar size={20} />;
    }
  };

  const getEventTypeLabel = (type) => {
    switch (type) {
      case 'basvuru':
        return 'Başvuru';
      case 'sinav':
        return 'Sınav';
      case 'egitim':
        return 'Eğitim';
      case 'toplanti':
        return 'Toplantı';
      case 'etkinlik':
        return 'Etkinlik';
      case 'toren':
        return 'Tören';
      default:
        return type;
    }
  };

  const isEventUpcoming = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 30;
  };

  const isEventPast = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    return event < today;
  };

  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'all') return events;
    return events.filter(e => e.type === selectedFilter);
  }, [selectedFilter]);

  const groupedEvents = useMemo(() => {
    const groups = {};
    filteredEvents.forEach(event => {
      const month = event.date.split(' ')[1];
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(event);
    });
    return groups;
  }, [filteredEvents]);

  return (
    <div className="academic-calendar" id="takvim">
      <div className="calendar-header">
        <h2 className="calendar-title">Akademik Takvim</h2>
        <p className="calendar-subtitle">2025-2026 Eğitim-Öğretim Yılı Önemli Tarihler</p>
      </div>

      <div className="calendar-filters">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="calendar-timeline">
        {Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <div key={month} className="timeline-month">
            <div className="month-marker">
              <span className="month-name">{month}</span>
            </div>
            <div className="month-events">
              {monthEvents.map((event, index) => (
                <div
                  key={index}
                  className={`timeline-event event-type-${event.type} ${isEventPast(event.date) ? 'past' : ''}`}
                >
                  <div className="event-icon">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="event-content">
                    <div className="event-date">
                      <Clock size={14} />
                      {event.date}
                    </div>
                    <h4 className="event-title">{event.event}</h4>
                    <span className={`event-type-badge type-${event.type}`}>
                      {getEventTypeLabel(event.type)}
                    </span>
                    {isEventUpcoming(event.date) && (
                      <span className="upcoming-badge">Yaklaşıyor</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="no-events">
          <Calendar size={48} />
          <p>Bu kategoride etkinlik bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;
