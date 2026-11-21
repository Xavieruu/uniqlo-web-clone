// Sample catalog used to seed the database on first run.
// category ids must match CATEGORIES in src/data/products.js
const ADULT = ['XS', 'S', 'M', 'L', 'XL']
const KIDS = ['110', '120', '130', '140', '150']
const BABY = ['60', '70', '80', '90']

const sizesFor = (g) => (g.includes('Baby') ? BABY : g.includes('Kids') ? KIDS : ADULT)

const p = (id, name, category, genders, price, colors) => ({
  id, name, category, genders, price, colors, sizes: sizesFor(genders),
})

export const PRODUCTS = [
  p(1, 'Hooded Puffer Jacket', 'outerwear', ['Women'], 3990, ['Beige', 'Black']),
  p(2, 'Utility Blouson', 'outerwear', ['Men'], 2990, ['Olive', 'Navy']),
  p(3, 'Windproof Parka', 'outerwear', ['Kids'], 2490, ['Navy', 'Gray']),
  p(4, 'Ultra Light Down Jacket', 'down', ['Women', 'Men'], 4990, ['Black', 'Navy', 'Olive']),
  p(5, 'Seamless Down Parka', 'down', ['Women'], 7990, ['Black', 'Beige']),
  p(6, 'Warm Padded Coat', 'down', ['Kids'], 3490, ['Pink', 'Navy']),
  p(7, 'Baby Down Overall', 'down', ['Baby'], 2990, ['Beige', 'Pink']),
  p(8, 'Supima Cotton Crew Neck Tee', 'tshirts', ['Women', 'Men'], 590, ['Brown', 'Beige', 'White', 'Black']),
  p(9, 'Airism Cotton Oversized Tee', 'tshirts', ['Women', 'Men'], 790, ['White', 'Gray']),
  p(10, 'Graphic Sweatshirt', 'tshirts', ['Kids'], 990, ['Gray', 'Pink']),
  p(11, 'Cotton Bodysuit', 'tshirts', ['Baby'], 490, ['White', 'Beige']),
  p(12, 'Fluffy Fleece Full-Zip', 'fleece', ['Women', 'Men'], 1490, ['Navy', 'Brown', 'Pink']),
  p(13, 'Fleece Pullover', 'fleece', ['Kids'], 990, ['Navy', 'Olive']),
  p(14, 'Fleece Jacket', 'fleece', ['Baby'], 790, ['Beige', 'Gray']),
  p(15, 'Relaxed Silk Blend Blouse', 'shirts', ['Women'], 1290, ['Olive', 'White']),
  p(16, 'Linen Blend Shirt', 'shirts', ['Men'], 1490, ['Beige', 'White', 'Navy']),
  p(17, 'Flannel Check Shirt', 'shirts', ['Kids'], 890, ['Navy', 'Brown']),
  p(18, 'Barrel Leg Pants', 'bottoms', ['Women'], 1990, ['Navy', 'Black']),
  p(19, 'Wide Fit Chino Pants', 'bottoms', ['Men'], 1790, ['Olive', 'Beige', 'Black']),
  p(20, 'Stretch Leggings', 'bottoms', ['Kids'], 590, ['Black', 'Gray']),
  p(21, 'Baby Joggers', 'bottoms', ['Baby'], 590, ['Navy', 'Gray']),
  p(22, 'Airism Camisole', 'innerwear', ['Women'], 590, ['White', 'Black', 'Pink']),
  p(23, 'Heattech Crew Neck', 'innerwear', ['Men'], 790, ['Black', 'Gray', 'White']),
  p(24, 'Soft Cotton Undershirt', 'innerwear', ['Kids', 'Baby'], 390, ['White']),
  p(25, 'Belted Shirt Dress', 'dresses', ['Women'], 2490, ['Navy', 'Black']),
  p(26, 'Pleated Midi Skirt', 'dresses', ['Women'], 1590, ['Beige', 'Navy']),
  p(27, 'Printed Cotton Dress', 'dresses', ['Kids'], 1190, ['Pink', 'White']),
  p(28, 'Baby Romper Dress', 'dresses', ['Baby'], 890, ['Pink', 'Beige']),
]
