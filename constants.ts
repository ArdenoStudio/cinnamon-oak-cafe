import { MenuItem, SignatureItem, Testimonial } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Coffee
  { id: 'c1', name: 'Double Espresso', description: 'Rich, intense, and pure. Single origin Arabica.', price: 650, category: 'Coffee' },
  { id: 'c2', name: 'Ceylon Spiced Flat White', description: 'Silky microfoam over a double ristertto, infused with Ceylon cinnamon.', price: 1050, category: 'Coffee' },
  { id: 'c3', name: 'Dimbula Pour Over', description: 'Single-origin highland beans, bright with notes of citrus and tea-flower.', price: 1250, category: 'Coffee' },
  { id: 'c4', name: '24h Cold Brew', description: 'Steeped for 24 hours. Smooth, chocolatey, zero acidity.', price: 900, category: 'Coffee' },

  // Matcha
  { id: 'm1', name: 'Ceremonial Usucha', description: 'Traditional thin tea, whisked to frothy perfection.', price: 1400, category: 'Matcha' },
  { id: 'm2', name: 'Matcha Latte', description: 'Uji matcha with steamed oat milk and agave.', price: 1100, category: 'Matcha' },
  { id: 'm3', name: 'Dirty Matcha', description: 'Matcha latte with a shot of house espresso.', price: 1300, category: 'Matcha' },

  // Artisanal Tea
  { id: 't1', name: 'Silver Tips', description: 'Rare hand-picked white tea from Nuwara Eliya.', price: 1800, category: 'Artisanal Tea' },
  { id: 't2', name: 'Earl Grey Lavender', description: 'Classic bergamot with organic french lavender.', price: 950, category: 'Artisanal Tea' },
  { id: 't3', name: 'Jasmine Pearl', description: 'Green tea pearls scented with fresh jasmine flowers.', price: 1100, category: 'Artisanal Tea' },

  // Breakfast
  { id: 'b1', name: 'Smashed Avo & Seeni Sambol', description: 'Sourdough, poached egg, sweet and spicy seeni sambol, feta.', price: 2350, category: 'Breakfast', isVegetarian: true },
  { id: 'b2', name: 'Truffle & Kochchi Scramble', description: 'Soft eggs, bird\'s eye chili, black truffle oil, brioche.', price: 2550, category: 'Breakfast', isVegetarian: true },
  { id: 'b3', name: 'Tropical Granola Bowl', description: 'House granola, greek yogurt, Kandy mango, passion fruit, palmyra treacle.', price: 1950, category: 'Breakfast', isVegetarian: true },

  // Mains
  { id: 'ma1', name: 'Ceylon Spiced Salmon', description: 'Curry leaf crust, quinoa salad, edamame, and lime pickle.', price: 3950, category: 'Mains' },
  { id: 'ma2', name: 'Pol Sambol & Cheese Panini', description: 'Fresh coconut sambol, buffalo mozzarella, smoked cheese, house sourdough.', price: 1850, category: 'Mains' },
  { id: 'ma3', name: 'Yellow Rice Risotto', description: 'Arborio rice, turmeric, roasted cashew, curry leaf tempeh.', price: 2450, category: 'Mains', isVegetarian: true },

  // Desserts
  { id: 'd1', name: 'Matcha & Jaggery Opera', description: 'Layers of matcha sponge and Kithul jaggery ganache.', price: 1350, category: 'Desserts' },
  { id: 'd2', name: 'Spiced Dark Chocolate Tart', description: '70% dark chocolate, Ceylon cardamoms, maldon sea salt.', price: 1250, category: 'Desserts' },
  { id: 'd3', name: 'Lime & Curd Cheesecake', description: 'Tangy local buffalo curd base, citrusy, graham cracker crust.', price: 1450, category: 'Desserts' },
];

export const SIGNATURE_MATCHA: SignatureItem[] = [
  { id: 's1', name: 'Sweetened Matcha', description: 'The classic comfort.', image: 'https://images.unsplash.com/photo-1771002469947-794293ccc9e3?auto=format&fit=crop&q=80&w=2574' },
  { id: 's2', name: 'Strawberry Matcha', description: 'Fresh puree layers.', image: 'https://images.unsplash.com/photo-1771405317905-44d78aa82d3e?auto=format&fit=crop&q=80&w=2574' },
  { id: 's3', name: 'Mango Matcha', description: 'Tropical fusion.', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&q=80&w=2670' },
  { id: 's4', name: 'Coconut Matcha', description: 'Island vibes.', image: 'https://images.unsplash.com/photo-1749280447307-31a68eb38673?auto=format&fit=crop&q=80&w=2671' },
  { id: 's5', name: 'Caramel Matcha', description: 'Decadent & savory.', image: 'https://images.unsplash.com/photo-1579888071069-c107a6f79d82?auto=format&fit=crop&q=80&w=2574' },
];

export const REVIEWS: Testimonial[] = [
  { id: 'r1', name: 'Amara de Silva', comment: 'The best matcha in Colombo, hands down. The ambiance transports you from Colombo 6 straight to Kyoto.', rating: 5, date: 'Oct 2023' },
  { id: 'r2', name: 'Dinesh Ratnayake', comment: 'A hidden sanctuary on Galle Road. The coffee is world-class and the Sri Lankan fusion snacks are brilliant.', rating: 5, date: 'Nov 2023' },
  { id: 'r3', name: 'Sarah Gunasekera', comment: 'Loved the Pol Sambol Panini and the island coconut matcha. Perfect spot for a quiet Colombo evening.', rating: 5, date: 'Dec 2023' },
];