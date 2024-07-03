import React from 'react';

const AboutSection = () => {
  return (
    <section className="about-our-collection" style={sectionStyle}>
      <h2 style={headerStyle}>About Us</h2>
      <div className="collection-content" style={contentStyle}>
        <img src="/profile_about.png" alt="Elegant Watches" style={imageStyle} />
        <div className="collection-text" style={textStyle}>
          <p style={paragraphStyle}>
            We offer a curated selection of the world's finest timepieces, each chosen for its exceptional craftsmanship, design, and heritage. Our catalog features watches from renowned manufacturers known for their precision and attention to detail.
          </p>
          <p style={paragraphStyle}>
            Explore our range of luxury watches that embody sophistication and technological innovation. Whether you are a collector or seeking the perfect piece for special occasions, our selection promises to meet your highest expectations.
          </p>
          <p style={paragraphStyle}>
            Join us on a journey through time with pieces that tell a story of tradition, innovation, and the finest craftsmanship available in the world today.
          </p>
        </div>
      </div>
    </section>
  );
};

const sectionStyle = {
  padding: '40px 20px',
  backgroundColor: '#f9f9f9',
  textAlign: 'center',
};

const headerStyle = {
  fontSize: '2.5rem',
  marginBottom: '20px',
  color: '#333',
};

const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
};

const imageStyle = {
  maxWidth: '100%',
  height: 'auto',
  borderRadius: '10px',
};

const textStyle = {
  maxWidth: '600px',
  textAlign: 'left',
};

const paragraphStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.6',
  color: '#666',
  marginBottom: '10px',
};

export default AboutSection;
