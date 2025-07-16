// src/components/MediaManager.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MediaManager.css';

export default function MediaManager({ onEdit }) {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchList = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:5000/media');
      const data = await res.json();
      if (Array.isArray(data)) setList(data);
      else throw new Error('Invalid data format');
    } catch (err) {
      console.error(err);
      setError('Failed to load media');
      setList([]);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleEdit = (mediaId) => {
    onEdit(mediaId);
    navigate('/transcripts');
  };

  return (
    <div className="media-card">
      <h3 className="media-title">Your Recordings</h3>
      <button className="media-refresh-btn" onClick={fetchList}>🔄 Refresh</button>

      {error && <p className="media-error">{error}</p>}

      {list.length === 0 ? (
        <p className="media-empty">No recordings yet.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="media-swiper"
        >
          {list.map((m) => {
            const status = (m.status || 'unknown').toLowerCase();
            return (
              <SwiperSlide key={m.media_id}>
                <div className="media-item">
                  <div className="media-thumb">🎥</div>
                  <div className="media-info">
                    <p><strong>HCP:</strong> {m.hcpName}</p>
                    <p><strong>Specialty:</strong> {m.speciality}</p>
                  </div>
                  <button className="media-action-btn" onClick={() => handleEdit(m.media_id)}>
                    ✍️ Edit Transcript
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
