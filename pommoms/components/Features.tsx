import { useTranslation } from 'next-i18next';

// Define an interface for the feature items
interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

const Features = () => {
  const { t } = useTranslation('common');
  
  // Cast the translated array to the correct type
  const featureItems = t('features.items', { returnObjects: true }) as FeatureItem[];
  
  return (
    <section id="features" className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {t('features.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature: FeatureItem, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {t('register.title')}
          </h3>
          <p className="text-gray-600">
            {t('register.description')}
          </p>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-pink-100 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {t('community.title')}
          </h3>
          <p className="text-gray-600">
            {t('community.description')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;