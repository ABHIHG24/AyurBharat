const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 item-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          Welcome to
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-wide">
              AyurBharat!
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        AyurBharat is your trusted destination for authentic Ayurvedic products
        in India. We're dedicated to reviving the ancient wisdom of Ayurveda and
        providing high-quality herbal remedies, skincare essentials, and
        wellness solutions. Our mission is to empower individuals to embrace
        natural healing and live a balanced, vibrant life. Join us on this
        journey to rediscover the power of Ayurveda and experience holistic
        well-being, one remedy at a time.
      </p>
    </>
  );
};
export default About;
