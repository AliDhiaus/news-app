import { getData } from '../../lib/Data';
import { Article } from '../../types/Global';
import Image from 'next/image';
import Link from 'next/link';
import { DetailPageProps } from '../../types/Global';
import { Button, Card, Col, Divider, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import Text from 'antd/es/typography/Text';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default async function DetailPage({ params }: DetailPageProps) {
  const { title: encodedTitle } = await params;
  const decodedTitle = decodeURIComponent(encodedTitle);
  let article: Article | null = null;
  let errorOccurred = false;

  try {
    const allNewsData = await getData();
    article = allNewsData.articles.find((art) => art.title === decodedTitle) || null;

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
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
        <Card style={{ textAlign: 'center', maxWidth: 500, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <Title level={3} type="secondary" style={{ color: '#595959' }}>Article Not Found</Title>
          <Paragraph style={{ color: '#8c8c8c' }}>The article you are looking for does not exist or an error occurred while loading.</Paragraph>
          <Link href="/" passHref>
            <Button type="primary" size="large" icon={<ArrowLeftOutlined />} style={{ marginTop: 24 }}>
              Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Row justify="center" style={{ marginBottom: 48, background: '#ffffff', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '32px 24px' }}>
        <Col xs={24} lg={20}> 
          <Title level={1} style={{ marginBottom: 24, fontSize: '2.5rem', lineHeight: '1.2', color: '#262626' }}>
            {article.title}
          </Title>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
            {article.author && (
              <Text type="secondary" style={{ fontSize: 15, color: '#595959', marginRight: 16, marginBottom: 8 }}>
                By <Text strong>{article.author.split(',')[0]}</Text>
              </Text>
            )}
            {article.publishedAt && (
              <Text type="secondary" style={{ fontSize: 15, color: '#595959', marginBottom: 8 }}>
                Published on{' '}
                {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            )}
          </div>
          {article.urlToImage && (
            <div style={{ position: 'relative', width: '100%', height: 450, marginBottom: 40, borderRadius: 12, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              <Image
                src={article.urlToImage}
                alt={article.title || 'Article Image'}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 75vw"
                priority
                unoptimized
              />
            </div>
          )}
          {article.content ? (
            <Paragraph style={{ fontSize: 17, lineHeight: '1.8', color: '#333', marginBottom: 24 }}>
              {article.content.split('[+')[0]}
            </Paragraph>
          ) : article.description && (
            <Paragraph style={{ fontSize: 17, lineHeight: '1.8', color: '#333', marginBottom: 24 }}>
              {article.description}
            </Paragraph>
          )}
          {article.url && (
            <>
              <Divider style={{ margin: '40px 0' }} /> {/* More generous spacing */}
              <Paragraph style={{ fontSize: 15, color: '#595959' }}>
                <Text strong>Read the full article at:{' '}</Text>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff', textDecoration: 'underline' }}>
                  <Text ellipsis={true} style={{ maxWidth: 'calc(100% - 180px)', display: 'inline-block', verticalAlign: 'middle' }}>{article.url}</Text>
                </a>
              </Paragraph>
            </>
          )}
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 40, marginBottom: 40 }}>
        <Col>
          <Link href="/" passHref>
            <Button type="primary" size="large" icon={<ArrowLeftOutlined />} style={{ borderRadius: 6, padding: '0 24px' }}> {/* Changed to 'primary' for prominence */}
              Back to Home
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
}
