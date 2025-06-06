import { getData } from '../../lib/Data';
import { Article } from '../../types/Global';
import Link from 'next/link';
import { DetailPageProps } from '../../types/Global';
import { Button, Card, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';

export default async function DetailPage({ params }: DetailPageProps) {
  const { title: encodedTitle } = await params;
  const decodedTitle = decodeURIComponent(encodedTitle);
  let article: Article | null = null;
  let errorOccurred = false;

  try {
    const allNewsData: Article[] = await getData();
    article = allNewsData.find((art) => art.title === decodedTitle) || null;

    if (!article) {
      console.error(`Article with title "${decodedTitle}" not found in fetched data.`);
      errorOccurred = true;
    }
  } catch (error) {
    console.error('Error fetching data for detail page:', error);
    errorOccurred = true;
  }

  if (errorOccurred || !article) {
    return (
      <Content style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
        <Card style={{ textAlign: 'center', maxWidth: 500, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Title level={3} type="secondary" style={{ color: '#595959' }}>Article Not Found</Title>
          <Paragraph style={{ color: '#8c8c8c' }}>The article you are looking for does not exist or an error occurred while loading.</Paragraph>
          <Link href="/" passHref>
            <Button type="primary" size="large" icon={<ArrowLeftOutlined />} style={{ marginTop: 24 }}>
              Back to Home
            </Button>
          </Link>
        </Card>
      </Content>
    );
  }

  return (
    <Content style={{
      background: '#ffffff',
      padding: 'clamp(1rem, 4vw, 3rem)',
      margin: '0 auto',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      <Link href={'/'}>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          style={{ borderRadius: 12, padding: '12px 24px', marginBottom: '1rem' }}
        >
          Back
        </Button>
      </Link>
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(250px, 50vw, 400px)',
        marginBottom: '2rem',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f0f2f5 0%, #d9d9d9 100%)'
      }}>
        {article.urlToImage ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            width='100%'
            height='100%'
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
            preview={true}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            color: '#bfbfbf'
          }}>
            📰
          </div>
        )}
      </div>

      <Title
        level={1}
        style={{
          fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
          fontWeight: 700,
          lineHeight: '1.3',
          color: '#1a1a1a',
          marginBottom: '1.5rem',
          letterSpacing: '-0.01em'
        }}
      >
        {article.title}
      </Title>

      <Paragraph
        style={{
          fontSize: 'clamp(16px, 4vw, 18px)',
          lineHeight: '1.7',
          color: '#4a4a4a',
          marginBottom: '2rem',
          fontWeight: 400,
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          fontStyle: 'italic'
        }}
      >
        {article.description || 'Deskripsi artikel tidak tersedia.'}
      </Paragraph>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '12px',
        border: '1px solid #dee2e6'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1890ff, #36cfc9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            ✍️
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#8c8c8c', fontWeight: 500 }}>
              PENULIS
            </div>
            <Text strong style={{ fontSize: '14px', color: '#262626' }}>
              {article.author?.split(',')[0] || 'Tidak diketahui'}
            </Text>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #52c41a, #73d13d)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px'
          }}>
            📅
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#8c8c8c', fontWeight: 500 }}>
              DIPUBLIKASI
            </div>
            <Text strong style={{ fontSize: '14px', color: '#262626' }}>
              {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </div>
        </div>
      </div>

      {article.content && (
        <div style={{
          marginBottom: '2rem',
          padding: '2rem',
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#1890ff',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '1rem',
            letterSpacing: '1px'
          }}>
            KONTEN ARTIKEL
          </div>
          <Paragraph style={{
            fontSize: 'clamp(15px, 3.5vw, 16px)',
            lineHeight: '1.8',
            color: '#333333',
            textAlign: 'justify'
          }}>
            {article.content}
          </Paragraph>
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%)',
        borderRadius: '12px',
        border: '1px solid #91caff'
      }}>
        {/* Source Name */}
        {article.source && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px'
            }}>
              🏢
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#1890ff', fontWeight: 600 }}>
                SUMBER:
              </span>
              <Text strong style={{ fontSize: '14px', color: '#1890ff', marginLeft: '0.5rem' }}>
                {typeof article.source === 'object' ? article.source.name : article.source}
              </Text>
            </div>
          </div>
        )}
      </div>
    </Content>
  );
}
