'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getData } from './lib/Data';
import { Article } from './types/Global';
import { Card, Row, Col, Typography, Empty, Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData('bitcoin')
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        console.error(err);
        setArticles([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Content>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}>
          <Spin size="large" />
        </div>
      ) : articles.length === 0 ? (
        <Empty
          description="No news available"
          style={{ marginTop: '4rem' }}
        />
      ) : (
        <Row gutter={[24, 24]}>
          {articles.map((article, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Link href={`/detail/${encodeURIComponent(article.title)}`}>
                <Card
                  hoverable
                  cover={
                    article.urlToImage ? (
                      <div style={{ position: 'relative', width: '100%', height: 300, }}>
                        <Image
                          src={article.urlToImage}
                          alt={article.title || 'Article Image'}
                          fill
                          style={{ objectFit: 'cover', borderRadius: 8 }}
                          sizes="(max-width: 768px) 100vw, 75vw"
                          priority
                          unoptimized
                        />
                      </div>

                    ) : (
                      <div style={{ height: 200, background: '#ccc' }} />
                    )
                  }
                >
                  <Title level={5}>{article.title}</Title>
                  <Paragraph ellipsis={{ rows: 2 }}>
                    {article.description || 'No description'}
                  </Paragraph>
                  <div style={{ fontSize: 12, color: '#888' }}>
                    <div>{article.author?.split(',')[0]}</div>
                    <div>
                      {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Content>
  );
}
