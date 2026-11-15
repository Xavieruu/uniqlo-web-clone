import images from './images'

export const GENDERS = ['Women', 'Men', 'Kids', 'Baby']

export const CATEGORIES = [
  { id: 'outerwear', label: 'Outerwear', img: images.catOuterwear },
  { id: 'down', label: 'Down', img: images.catDown },
  { id: 'tshirts', label: 'T-Shirts, Sweats & Fleece', img: images.catTshirts },
  { id: 'fleece', label: 'Fleece', img: images.catFleece },
  { id: 'shirts', label: 'Shirts & Blouses', img: images.catShirts },
  { id: 'bottoms', label: 'Bottoms', img: images.catBottoms },
  { id: 'innerwear', label: 'Innerwear & Underwear', img: images.catInnerwear },
  { id: 'dresses', label: 'Dresses & Skirts', img: images.catDresses },
]

export const COLORS = {
  Black: '#111111',
  Navy: '#1f2a44',
  Beige: '#d8c9a8',
  Brown: '#6b4a3a',
  Olive: '#7a7b3a',
  White: '#f4f4f2',
  Pink: '#e8b4b8',
  Gray: '#8a8d91',
}

const SIZES_ADULT = ['XS', 'S', 'M', 'L', 'XL']
const SIZES_KIDS = ['110', '120', '130', '140', '150']
const SIZES_BABY = ['60', '70', '80', '90']

export const sizesFor = (genders) =>
  genders.includes('Baby')
    ? SIZES_BABY
    : genders.includes('Kids')
    ? SIZES_KIDS
    : SIZES_ADULT

const catImg = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.img]))

const make = (id, name, category, genders, price, colors) => ({
  id,
  name,
  category,
  genders,
  price,
  colors,
  sizes: sizesFor(genders),
  img: catImg[category],
})

export const PRODUCTS = [
  make(1, 'Hooded Puffer Jacket', 'outerwear', ['Women'], 3990, ['Beige', 'Black']),
  make(2, 'Utility Blouson', 'outerwear', ['Men'], 2990, ['Olive', 'Navy']),
  make(3, 'Windproof Parka', 'outerwear', ['Kids'], 2490, ['Navy', 'Gray']),
  make(4, 'Ultra Light Down Jacket', 'down', ['Women', 'Men'], 4990, ['Black', 'Navy', 'Olive']),
  make(5, 'Seamless Down Parka', 'down', ['Women'], 7990, ['Black', 'Beige']),
  make(6, 'Warm Padded Coat', 'down', ['Kids'], 3490, ['Pink', 'Navy']),
  make(7, 'Baby Down Overall', 'down', ['Baby'], 2990, ['Beige', 'Pink']),
  make(8, 'Supima Cotton Crew Neck Tee', 'tshirts', ['Women', 'Men'], 590, ['Brown', 'Beige', 'White', 'Black']),
  make(9, 'Airism Cotton Oversized Tee', 'tshirts', ['Women', 'Men'], 790, ['White', 'Gray']),
  make(10, 'Graphic Sweatshirt', 'tshirts', ['Kids'], 990, ['Gray', 'Pink']),
  make(11, 'Cotton Bodysuit', 'tshirts', ['Baby'], 490, ['White', 'Beige']),
  make(12, 'Fluffy Fleece Full-Zip', 'fleece', ['Women', 'Men'], 1490, ['Navy', 'Brown', 'Pink']),
  make(13, 'Fleece Pullover', 'fleece', ['Kids'], 990, ['Navy', 'Olive']),
  make(14, 'Fleece Jacket', 'fleece', ['Baby'], 790, ['Beige', 'Gray']),
  make(15, 'Relaxed Silk Blend Blouse', 'shirts', ['Women'], 1290, ['Olive', 'White']),
  make(16, 'Linen Blend Shirt', 'shirts', ['Men'], 1490, ['Beige', 'White', 'Navy']),
  make(17, 'Flannel Check Shirt', 'shirts', ['Kids'], 890, ['Navy', 'Brown']),
  make(18, 'Barrel Leg Pants', 'bottoms', ['Women'], 1990, ['Navy', 'Black']),
  make(19, 'Wide Fit Chino Pants', 'bottoms', ['Men'], 1790, ['Olive', 'Beige', 'Black']),
  make(20, 'Stretch Leggings', 'bottoms', ['Kids'], 590, ['Black', 'Gray']),
  make(21, 'Baby Joggers', 'bottoms', ['Baby'], 590, ['Navy', 'Gray']),
  make(22, 'Airism Camisole', 'innerwear', ['Women'], 590, ['White', 'Black', 'Pink']),
  make(23, 'Heattech Crew Neck', 'innerwear', ['Men'], 790, ['Black', 'Gray', 'White']),
  make(24, 'Soft Cotton Undershirt', 'innerwear', ['Kids', 'Baby'], 390, ['White']),
  make(25, 'Belted Shirt Dress', 'dresses', ['Women'], 2490, ['Navy', 'Black']),
  make(26, 'Pleated Midi Skirt', 'dresses', ['Women'], 1590, ['Beige', 'Navy']),
  make(27, 'Printed Cotton Dress', 'dresses', ['Kids'], 1190, ['Pink', 'White']),
  make(28, 'Baby Romper Dress', 'dresses', ['Baby'], 890, ['Pink', 'Beige']),
]

// Items shown in the "New Collections" section on the Home page
export const COLLECTION_IDS = [8, 16, 12]
export const collectionImgs = [images.collection1, images.collection2, images.collection3]

export const formatPrice = (n) =>
  '₱' + n.toLocaleString('en-PH', { minimumFractionDigits: 0 })
