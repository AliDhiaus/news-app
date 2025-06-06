'use client';

import React from 'react';
import { Typography, Layout } from 'antd';

const { Title, Paragraph } = Typography;
const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntHeader
      style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        borderBottom: '1px solid #f0f0f0',
        padding: '1rem',
        textAlign: 'center',
        height: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        <Title
          level={1}
          style={{
            fontSize: 'clamp(1.5rem, 2rem, 2.5rem)',
            background: 'linear-gradient(to right, #2563eb, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            marginBottom: '0.5rem',
            wordBreak: 'break-word',
          }}
        >
          📰 Top Headlines
        </Title>
        <Paragraph
          style={{
            color: '#666',
            fontSize: 'clamp(0.9rem, 1rem, 1.1rem)',
            margin: 0,
          }}
        >
          Stay updated with the latest news from around the world
        </Paragraph>
      </div>
    </AntHeader>
  );
};

export default Header;
