'use client';

import React from 'react';
import Link from 'next/link';
import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter
      style={{
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderTop: '1px solid #f0f0f0',
        padding: '24px 16px',
      }}
    >
      <Text type="secondary" style={{ fontSize: '14px' }}>
        © {new Date().getFullYear()} <strong>News App</strong>. Powered by{' '}
        <Link
          href="https://alidsx.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text underline style={{ color: '#1677ff' }}>
            AliDSX
          </Text>
        </Link>
      </Text>
    </AntFooter>
  );
};

export default Footer;
