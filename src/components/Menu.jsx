import React, { useState, useEffect } from 'react'
import '../styles/menu.css'
import '../styles/item-modal.css'
import saladImg from '../../images/salad.png'
import appetizersImg from '../../images/appetizers.png'
import grillImg from '../../images/Grills.png'
import shawermaImg from '../../images/shawerma.png'
import sandweshesImg from '../../images/sandweshes.png'
import mealsImg from '../../images/meals.png'
import eastImg from '../../images/east.png'
import barImg from '../../images/bar.png'
import hotdrinksImg from '../../images/Hotdrinks.png'
import juicesImg from '../../images/Juices.png'
import mohetoImg from '../../images/moheto.png'
import colaImg from '../../images/cola.png'
import slashImg from '../../images/slash.png'
import brestImg from '../../images/brest.png'
import iceCoffeeImg from '../../images/iceCoffee.png'
import iceLatteImg from '../../images/iceLatte.png'
import iceNuttelaImg from '../../images/iceNuttela.png'
import vanella from '../../images/vanella.png'
import oreoImg from '../../images/oreo.png'
import nuttelaMilksheek from '../../images/nuttelaMikshek.png'
import orang from '../../images/orang.png'
import ananas from '../../images/ananas.png'
import lemonMint from '../../images/lemonMint.png'
import stroberry from '../../images/stroberry.png'
import vemto from '../../images/vemto.png'
import coctel from '../../images/coctel.png'
import lotes from '../../images/lotes.png'
import bestasheo from '../../images/bestasheo.png'
import moca from '../../images/moca.png'
import iceCramel from '../../images/iceCramel.png'
import spanish from '../../images/spanish.png'
import water from '../../images/water.png'
import vegetable from '../../images/vegetable.png'
import yonani from '../../images/yonani.png'
import corn from '../../images/corn.png'
import turkey from '../../images/turkey.png'
import colslow from '../../images/colslow.png'
import cabbage from '../../images/cabbage.png'
import redcabbage from '../../images/redcabbage.png'
import Cucumber from '../../images/Cucumber.png'
import daqous from '../../images/daqous.png'
import tomea from '../../images/tomea.png'
import kobba from '../../images/kobba.png'
import ewanBalls from '../../images/ewanBalls.png'
import gratan from '../../images/gratan.png'
 import cheesFinger from '../../images/cheesFinger.png'
 import potato from '../../images/potato.png'
 import potatoBalls from '../../images/potatoBalls.png'
import grillChicken from '../../images/grillChicken.png'
import goatWings from '../../images/goatWings.png'
import arabicGrill from '../../images/arabicGrill.png'
import adena from '../../images/adena.png'
import bolghari from '../../images/bolghari.png'
import orfa from '../../images/orfa.jpeg'
import msahab from '../../images/msahab.png'
import steck from '../../images/steck.png'
import feleh from '../../images/feleh.png'
import mshakal from '../../images/mshakal.png'
import wafelMix from '../../images/wafelMix.png'

const ItemModal = ({ item, categoryImage, onClose, onAdd }) => {
  // Build all price options for this item
  const priceOptions = []
  if (item.prices) {
    item.prices.forEach(p => priceOptions.push({ label: p.label, value: p.value }))
  } else {
    if (item.priceLarge != null) priceOptions.push({ label: item.priceLargeLabel || 'كبير', value: item.priceLarge })
    if (item.priceSmall != null) priceOptions.push({ label: item.priceSmallLabel || 'صغير', value: item.priceSmall })
    if (priceOptions.length === 0 && item.price != null) priceOptions.push({ label: item.priceLabel || '', value: item.price })
  }

  const hasOptions = priceOptions.length > 1
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const selectedOption = priceOptions[selectedIdx] ?? null
  const basePrice = selectedOption?.value ?? null

  const handleAdd = () => {
    const cartItem = {
      ...item,
      price: basePrice ?? 0,
      id: hasOptions ? `${item.id}_${selectedIdx}` : item.id,
      name: hasOptions ? `${item.name} - ${selectedOption.label}` : item.name,
    }
    onAdd(cartItem, qty)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-img">
          <img src={item.image ?? categoryImage} alt={item.name} />
        </div>
        <div className="modal-body">
          <h3 className="modal-name">{item.name}</h3>
          {item.description && <p className="modal-desc">{item.description}</p>}

          {hasOptions && (
            <div className="modal-options">
              {priceOptions.map((opt, i) => (
                <button
                  key={i}
                  className={`modal-option-btn ${selectedIdx === i ? 'selected' : ''}`}
                  onClick={() => setSelectedIdx(i)}
                >
                  <span className="option-label">{opt.label}</span>
                  <span className="option-price">₪ {opt.value}</span>
                </button>
              ))}
            </div>
          )}

          {basePrice != null && (
            <p className="modal-price">
              ₪ <span>{(basePrice * qty).toFixed(0)}</span>
            </p>
          )}

          <div className="modal-qty">
            <button className="modal-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <span className="modal-qty-num">{qty}</span>
            <button className="modal-qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <button className="modal-add-btn" onClick={handleAdd}>
            🛒 أضف إلى السلة
          </button>
        </div>
      </div>
    </div>
  )
}

const Menu = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [addedItems, setAddedItems] = useState({})
  const [modalItem, setModalItem] = useState(null)

  const categories = [
    { id: 'salad', label: 'سلطات', image: saladImg, itemCount: 11 },
    { id: 'appetizers', label: 'مقبلات', image: appetizersImg, itemCount: 7 },
    { id: 'grill', label: 'مشاوي', image: grillImg, itemCount: 11, note: 'جميع الوجبات تقدم مع الشيبس أو الأرز' },
    { id: 'shawerma', label: 'شاورما', image: shawermaImg, itemCount: 10 },
    { id: 'sandweshes', label: 'ساندويشات', image: sandweshesImg, itemCount: 11 },
    { id: 'meals', label: 'الوجبات', image: mealsImg, itemCount: 6, note: 'جميع الوجبات تقدم مع الشيبس أو الأرز' },
    { id: 'east', label: 'المطبخ الشرقي', image: eastImg, itemCount: 7, note: 'أنواع الأرز المتوفرة: أرز إيوان - أرز خضار - أرز مبهر - أرز كبسة' },
    { id: 'bar', label: 'حلويات البار', image: barImg, itemCount: 17 },
    { id: 'hotdrinks', label: 'المشروبات الساخنة', image: hotdrinksImg, itemCount: 19 },
    { id: 'juices', label: 'العصائر الطبيعية', image: juicesImg, itemCount: 21 }
  ]

  const menuItems = {
    salad: [
      { id: 's1', name: 'سلطة أيوان', image: null, priceLarge: 35, priceSmall: 20, description: 'ستيك الدجاج المقلي ومكس خضار مع صوص أيوان المخصوص', category: 'salad' },
      { id: 's2', name: 'سلطة خضار', image: vegetable, priceLarge: 15, priceSmall: 10, description: 'مزيج من الخضار الطازجة مع زيت الزيتون وعصير الليمون', category: 'salad' },
      { id: 's3', name: 'سلطة يونانية', image: yonani, priceLarge: 30, priceSmall: 20, description: 'خيار وطماطم وزيتون أسود وجبن فيتا مع صوص يوناني', category: 'salad' },
      { id: 's4', name: 'ذرة مايونيز', image: corn, priceLarge: 10, priceSmall: null, description: 'ذرة حلوة مع صوص مايونيز كريمي وبهارات خفيفة', category: 'salad' },
      { id: 's5', name: 'سلطة تركية', image: turkey, priceLarge: 10, priceSmall: null, description: 'طماطم وفلفل وبصل مع تتبيلة البهارات التركية', category: 'salad' },
      { id: 's6', name: 'كولسلو', image: colslow, priceLarge: 10, priceSmall: null, description: 'ملفوف مبشور مع جزر وصوص كريمي خفيف', category: 'salad' },
      { id: 's7', name: 'ملفوف أبيض', image: cabbage, priceLarge: 10, priceSmall: null, description: 'ملفوف أبيض طازج مع زيت الزيتون وعصير الليمون', category: 'salad' },
      { id: 's8', name: 'ملفوف أحمر', image: redcabbage, priceLarge: 10, priceSmall: null, description: 'ملفوف أحمر مبشور مع تتبيلة الخل والزيت', category: 'salad' },
      { id: 's9', name: 'خيار بلبن', image: Cucumber, priceLarge: 15, priceSmall: 10, description: 'خيار طازج مع لبن الزبادي والنعناع والثوم', category: 'salad' },
      { id: 's10', name: 'دقوس', image: daqous, priceLarge: null, priceSmall: 5, description: 'صلصة طماطم حارة مع الثوم والفلفل الأخضر', category: 'salad' },
      { id: 's11', name: 'ثومية', image: tomea, priceLarge: null, priceSmall: 5, description: 'كريمة الثوم الناعمة المحضرة طازجة يومياً', category: 'salad' }
    ],
    appetizers: [
      { id: 'a1', name: 'وجبة كبة', image: kobba, price: 25, priceSmall: null, description: '05 حبات كبة', category: 'appetizers' },
      { id: 'a2', name: 'وجبة كرات إيوان', image: ewanBalls, price: 20, priceSmall: null, description: '05 كرات إيوان', category: 'appetizers' },
      { id: 'a3', name: 'بطاط قراتان', image: gratan, price: 25, priceSmall: null, description: '05 كرات من البطاطا', category: 'appetizers' },
      { id: 'a4', name: 'وجبة أصابع دجاج', image: null, price: 25, priceSmall: null, description: '06 أصابع دجاج', category: 'appetizers' },
      { id: 'a5', name: 'وجبة أصابع جبنة', image: cheesFinger, price: 25, priceSmall: null, description: '05 أصابع جبنة', category: 'appetizers' },
      { id: 'a6', name: 'شيبس', image: potato, priceLarge: 15, priceSmall: 10, description: 'شيبس مقرمش بالنكهات', category: 'appetizers' },
      { id: 'a7', name: ' وجبة كرات بطاطا', image: potatoBalls, price: null, priceSmall: null, description: '06 حبات من الكرات', category: 'appetizers' }
    ],
    grill: [
      { id: 'g1', name: 'دجاجة بالفحم', image: grillChicken, priceLarge: 80, priceLargeLabel: 'دجاجة', priceSmall: 40, priceSmallLabel: 'نصف دجاجة', description: 'دجاجة كاملة مشوية على الفحم مع البهارات', category: 'grill' },
      { id: 'g2', name: 'ريش خاروف', image: goatWings, price: 50, description: 'ريش خروف طازجة مشوية على الفحم', category: 'grill' },
      { id: 'g3', name: 'كباب عربي', image: arabicGrill, price: 45, priceLabel: 'وجبة', description: 'كباب عربي أصيل مشوي على الفحم', category: 'grill' },
      { id: 'g4', name: 'كباب أضنة', image: adena, price: 55, priceLabel: 'وجبة', description: 'كباب أضنة الحار بالبهارات التركية', category: 'grill' },
      { id: 'g5', name: 'كباب بلغاري', image: bolghari, price: 50, priceLabel: 'وجبة', description: 'كباب بلغاري بالجبنة والبهارات الخاصة', category: 'grill' },
      { id: 'g6', name: 'كباب أورفا', image: orfa, priceLarge: 55, priceLargeLabel: 'لحم', priceSmall: 50, priceSmallLabel: 'دجاج', description: 'كباب أورفا الحار بطريقة تقليدية', category: 'grill' },
      { id: 'g7', name: 'مسحب', image: msahab, price: 45, priceLabel: 'وجبة', description: 'دجاج مسحب مشوي مع صوص خاص', category: 'grill' },
      { id: 'g8', name: 'ستيك دجاج', image: steck, price: 45, priceLabel: 'وجبة', description: 'ستيك دجاج مشوي بالأعشاب والثوم', category: 'grill' },
      { id: 'g9', name: 'شيش طاووق', image: null, price: 45, priceLabel: 'وجبة', description: 'قطع دجاج متبلة مشوية على السيخ', category: 'grill' },
      { id: 'g10', name: 'شيش فيليه', image: feleh, price: 60, priceLabel: 'وجبة', description: 'فيليه دجاج طري مشوي على السيخ', category: 'grill' },
      { id: 'g11', name: 'مشكل مشاوي', image: mshakal, price: 50, priceLabel: 'وجبة', description: 'تشكيلة من أفضل المشاوي في طبق واحد', category: 'grill' },
      { id: 'g12', name: 'شيش بريست', image: brestImg, price: 50, priceLabel: 'وجبة', description: 'كباب حلبي مع البهارات السورية المميزة', category: 'grill' }
    ],
    shawerma: [
      { id: 'sh1', name: 'شاورما عادي', image: null, price: 25, description: 'فرشوحة شاورما مع السلطة والمخلل', category: 'shawerma' },
      { id: 'sh2', name: 'شاورما دبل', image: null, price: 27, description: 'دبل فرشوحة من العراقي مع السلطة و المخلل', category: 'shawerma' },
      { id: 'sh3', name: 'دبل دبل', image: null, price: 33, description: 'دبل لحمة مع العراقي مع السلطة والمخلل', category: 'shawerma' },
      { id: 'sh4', name: 'شاورما اساور', image: null, price: 40, description: 'صاج الشاورما مع الجبنة والشيبس', category: 'shawerma' },
      { id: 'sh5', name: 'صفيحة', image: null, price: 40, description: 'صاج الشاورما مع الجبنة والشيبس والزيتون', category: 'shawerma' },
      { id: 'sh6', name: 'شاورما سوري', image: null, price: 35, description: 'صاج الشاورما مع المخلل الشيبس', category: 'shawerma' },
      { id: 'sh7', name: 'صاروخ', image: null, price: 45, description: 'صاج الشاورما مع المخلل والشيبس', category: 'shawerma' },
      { id: 'sh8', name: 'كيلو شاورما', image: null, price: 120, description: 'كيلو شاورما مع المخللات والسلطة', category: 'shawerma' },
      { id: 'sh9', name: 'ببجي', image: null, price: 45, description: 'فينو الشاورما مع الزيتون والجبن والصوص الخاص', category: 'shawerma' },
      { id: 'sh10', name: 'شاورما نابلسي', image: null, price: 50, description: 'الشيبس مع الشاورما ومكس الأجبان', category: 'shawerma' },
      { id: 'sh11', name: 'وجبة شاورما', image: null, prices: [{ label: 'وجبة لشخص', value: 40 }, { label: 'وجبة لشخصين', value: 80 }], description: 'وجبة من الشاورما مع الشيبس والطحينة لشخص او شخصين', category: 'shawerma' }

    ],
    sandweshes: [
      { id: 'sw1', name: 'تشيكن بيتزا',image: null, price: 24,description:'شرائح صدر الدجاج مع صوص البيتزا', category: 'sandweshes' },
      { id: 'sw2', name: 'تشكن مايز',  image: null, price: 30,description:'شرائح صدر الدجاج مع الذرة والكريمة ومكس الاجبان', category: 'sandweshes' },
      { id: 'sw3', name: 'تشكن جولي',  image: null, price: 25, description: 'شرائح صدر الدجاج مقرمش مع كريمة الخضار والجبنة', category: 'sandweshes' },
      { id: 'sw4', name: 'تشكن فيجارو',image: null, price: 25, description: 'شرائح صدر الدجاج مع الكريمة والمشروم والخضار', category: 'sandweshes' },
      { id: 'sw5', name: 'تشكن لافا',   image: null, price: 25, description: ' صدر الدجاج مع قطع البصل والكريمة والجبن', category: 'sandweshes' },
      { id: 'sw6', name: 'ماتش بايت',  image: null, price: 25, description: 'شرائح صدر الدجاج مع صوص المشروم مع خليط الثوم والخضار', category: 'sandweshes' },
      { id: 'sw7', name: 'تشكن باربكيو',image: null, price: 25, description: 'شرائح صدر الدجاج مع المشروم و صوص الباربكيو', category: 'sandweshes' },
      { id: 'sw8', name: 'تشيز تشكن ملت', image: null, price: 25, description: 'شرائح صدر الدجاج مع الجبن والمشروم وكريمة الزعتر', category: 'sandweshes' },
      { id: 'sw9', name: 'تشكن نوفا', image: null, price: 25, description: 'شرائح صدر الدجاج مشوي مع صوص السيزر والخضار ', category: 'sandweshes' },
      { id: 'sw10', name: 'تشكن تشكريتو', image: null, price: 25, description: 'شرائح صدر الدجاج مع قطع الهلبينو والخس والذرة والصوص الحار', category: 'sandweshes' },
      { id: 'sw11', name: 'تشكن سافوري', image: null, price: 25, description: 'شرائح صدر الدجاج مع الزيتون والمشروم والصوص والجبن', category: 'sandweshes' }
    ],
    meals: [
      { id: 'm1', name: 'تشكن كريمكس',    image: null, price: 60, priceLabel: 'وجبة', description: 'صدر الدجاج المقرمش مع صوص الكريمكس',                 category: 'meals' },
      { id: 'm2', name: 'بكاتا تشكن',     image: null, price: 60, priceLabel: 'وجبة', description: 'ستيك دجاج مقلي مع صوص الألفريدو',                     category: 'meals' },
      { id: 'm3', name: 'ميلت هيفين',     image: null, price: 60, priceLabel: 'وجبة', description: 'ستيك دجاج مع صوص الثوم والليمون والجبنة',             category: 'meals' },
      { id: 'm4', name: 'كودون بلو',      image: null, price: 60, priceLabel: 'وجبة', description: 'رول صدر الدجاج مع صوص المشروم',                        category: 'meals' },
      { id: 'm5', name: 'تشكن تشيز مليت', image: null, price: 60, priceLabel: 'وجبة', description: 'شرائح الدجاج مع الجبن والمشروم وكريمة الزعتر',        category: 'meals' },
      { id: 'm6', name: 'تشكن ألفريدو',   image: null, price: 60, priceLabel: 'وجبة', description: 'صدر الدجاج المشوي مع صوص الألفريدو',                   category: 'meals' }
    ],
    east: [
      { id: 'e1', name: 'أرز دجاجة',       image: null, priceLarge: 80,  priceLargeLabel: 'دجاجة كاملة',         priceSmall: 40,  priceSmallLabel: 'نصف دجاجة',          description: 'أرز مطبوخ بمرق الدجاج مع الدجاج المشوي',         category: 'east' },
      { id: 'e2', name: 'أرز لحم عجل',     image: null, priceLarge: 90,  priceLargeLabel: 'كيلو لحم عجل',        priceSmall: 45,  priceSmallLabel: 'نصف كيلو لحم عجل',   description: 'أرز مطبوخ بمرق اللحم مع لحم عجل طري',            category: 'east' },
      { id: 'e3', name: 'أرز لحم خاروف',   image: null, priceLarge: 120, priceLargeLabel: 'كيلو لحم خاروف',      priceSmall: 60,  priceSmallLabel: 'نصف كيلو لحم خاروف', description: 'أرز مطبوخ بمرق اللحم مع لحم خاروف طازج',         category: 'east' },
      { id: 'e4', name: 'فتة دجاجة',       image: null, priceLarge: 110, priceLargeLabel: 'دجاجة كاملة',         priceSmall: 60,  priceSmallLabel: 'نصف دجاجة',          description: 'خبز محمص مع الأرز واللبن والمرق والدجاج',         category: 'east' },
      { id: 'e5', name: 'فتة لحم عجل',     image: null, priceLarge: 120, priceLargeLabel: 'كيلو لحم عجل',        priceSmall: 60,  priceSmallLabel: 'نصف كيلو لحم عجل',   description: 'خبز محمص مع الأرز واللبن والمرق ولحم عجل',        category: 'east' },
      { id: 'e6', name: 'فتة لحم خاروف',   image: null, priceLarge: 120, priceLargeLabel: 'كيلو لحم خاروف',      priceSmall: 60,  priceSmallLabel: 'نصف كيلو لحم خاروف', description: 'خبز محمص مع الأرز واللبن والمرق ولحم الخاروف',    category: 'east' },
      { id: 'e7', name: 'مسخن',            image: null, priceLarge: 90,  priceLargeLabel: 'دجاجة كاملة',         priceSmall: 45,  priceSmallLabel: 'نصف دجاجة',          description: 'دجاجة مع البصل والزيت وبهارات الزعتر على الخبز', category: 'east' }
    ],
    bar: [
      { id: 'b1', name: 'فوتوتشيني كريب نوتيلا',image: null, price: 25, category: 'bar' },
      { id: 'b2', name: 'وافل نوتيلا', image: null, price: 25, category: 'bar' },
      { id: 'b3', name: 'موس نوتيلا', image: null, price: 15, category: 'bar' },
      { id: 'b4', name: 'كريب مكس', image: null, price: 30, category: 'bar' },
      { id: 'b5', name: 'وافل مكس', image: wafelMix, price: 30, category: 'bar' },
      { id: 'b6', name: 'موس بوينو', image: null, price: 15, category: 'bar' },
      { id: 'b7', name: 'تشيز كيك',image: null, price: 15, category: 'bar' },
      { id: 'b8', name: 'موس لوتس',image: null, price: 15, category: 'bar' },
      { id: 'b9', name: 'حلا دبي',image: null, price: 20, category: 'bar' },
      { id: 'b10', name: 'قشطوطة',image: null, price: 25, category: 'bar' },
      { id: 'b11', name: 'تيرليتشي',image: null, price: 15, category: 'bar' },
      { id: 'b12', name: 'تريبيل كريب',image: null, price: 30, category: 'bar' },
      { id: 'b13', name: 'كيك بلاك فوريست',image: null, price: 15, category: 'bar' },
      { id: 'b14', name: 'كيك لوتس',image: null, price: 15, category: 'bar' },
      { id: 'b15', name: 'كيك نوتيلا',image: null, price: 15, category: 'bar' },
      { id: 'b16', name: 'قالب كيك', image: null, prices: [{ label: 'صغير', value: 80 }, { label: 'وسط', value: 100 }, { label: 'كبير', value: 120 }], description: 'قالب كيك طازج بنكهتك المفضلة', category: 'bar' },
      { id:'b17', name: 'كريب نوتيلا',image: null, price: 25, category: 'bar' },
    ],
    hotdrinks: [
      { id: 'h1', name: 'كفي لاتيه نوتيلا', price: 15, category: 'hotdrinks' },
      { id: 'h2', name: 'سبريسو صغير', price: 8, category: 'hotdrinks' },
      { id: 'h3', name: 'سبريسو كبير', price: 12, category: 'hotdrinks' },
      { id: 'h4', name: 'نسكافيه', price: 8, category: 'hotdrinks' },
      { id: 'h5', name: 'قهوة تركي صغير', price: 5, category: 'hotdrinks' },
      { id: 'h6', name: 'قهوة تركي كبير', price: 8, category: 'hotdrinks' },
      { id: 'h7', name: 'كابتشينو', price: 8, category: 'hotdrinks' },
      { id: 'h8', name: 'كفي لاتيه', price: 10, category: 'hotdrinks' },
      { id: 'h9', name: 'كفي موكا', price: 15, category: 'hotdrinks' },
      { id: 'h10', name: 'سبانش لاتيه', price: 20, category: 'hotdrinks' },
      { id: 'h11', name: 'سينابون لاتيه', price: 20, category: 'hotdrinks' },
      { id: 'h12', name: 'ميكاتو لاتيه', price: 20, category: 'hotdrinks' },
      { id: 'h13', name: 'أمريكانو', price: 20, category: 'hotdrinks' },
      { id: 'h14', name: 'هوت لوتس', price: 15, category: 'hotdrinks' },
      { id: 'h15', name: 'هوت نوتيلا', price: 15, category: 'hotdrinks' },
      { id: 'h16', name: 'هوت بستاشيو', price: 15, category: 'hotdrinks' },
      { id: 'h17', name: 'هوت شوكليت', price: 15, category: 'hotdrinks' },
      { id: 'h18', name: 'أعشاب بالعسل', price: 5, category: 'hotdrinks' },
      { id: 'h19', name: 'شاي نعناع', price: 5, category: 'hotdrinks' }

    ],
    juices: [
      { id: 'j1', name: 'عصير أناناس',image:ananas, price: 15, category: 'juices' },
      { id: 'j2', name: 'عصير برتقال',image:orang, price: 15, category: 'juices' },
      { id: 'j3', name: 'ليمون نعناع',image:lemonMint, price: 15, category: 'juices' },
      { id: 'j4', name: 'عصير فراولة',image:stroberry, price: 15, category: 'juices' },
      { id: 'j5', name: 'عصير فيمتو',image:vemto, price: 15, category: 'juices' },
      { id: 'j6', name: 'كوكتيل',image:coctel, price: 20, category: 'juices' },
      { id: 'j7', name: 'ميلك شيك نوتيلا',image:nuttelaMilksheek, price: 20, category: 'juices' },
      { id: 'j8', name: 'ميلك شيك لوتس',image:lotes, price: 20, category: 'juices' },
      { id: 'j9', name: 'ميلك شيك أوريو',image:oreoImg, price: 20, category: 'juices' },
      { id: 'j10', name: 'ميلك شيك بستاشيو',image:bestasheo, price: 20, category: 'juices' },
      { id: 'j11', name: 'ميلك شيك فانيلا',image:vanella, price: 20, category: 'juices' },
      { id: 'j12', name: 'ايس موكا',image:moca, price: 20, category: 'juices' },
      { id: 'j13', name: 'ايس كراميل',image:iceCramel, price: 20, category: 'juices' },
      { id: 'j14', name: 'ايس كفي',image:iceCoffeeImg, price: 20, category: 'juices' },
      { id: 'j15', name: 'ايس نوتيلا',image:iceNuttelaImg, price: 20, category: 'juices' },
      { id: 'j16', name: 'ايس لاتيه',image:iceLatteImg, price: 20, category: 'juices' },
      { id: 'j17', name: 'ايس سبانيش لاتيه',image:spanish, price: 20, category: 'juices' },
      { id: 'j18', name: 'موهيتو',image:mohetoImg, price: 20, category: 'juices' },
      { id: 'j19', name: 'سلاش', price: 15,image:slashImg, category: 'juices' },
      { id: 'j20', name: 'مشروب غازي',image:colaImg, price: 22, category: 'juices' },
      { id: 'j21', name: 'مياه معدنية',image:water, price: 5, category: 'juices' }



    ]
  }

  const handleAddToCart = (item, qty = 1) => {
    for (let i = 0; i < qty; i++) onAddToCart(item)
    setAddedItems(prev => ({ ...prev, [item.id]: true }))
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }))
    }, 1500)
  }

  const CategoryIcon = ({ icon }) => {
    const p = {
      viewBox: '0 0 64 64',
      xmlns: 'http://www.w3.org/2000/svg',
      width: '54',
      height: '54',
      fill: 'none',
      stroke: 'rgba(196,30,46,0.85)',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }
    const icons = {
      shawerma: <svg {...p}><ellipse cx="32" cy="50" rx="18" ry="3.5" /><path d="M16 50 Q18 32 32 20 Q46 32 48 50" /><path d="M21 43 Q32 36 43 43" /><path d="M19 36 Q32 29 45 36" /></svg>,
      grill: <svg {...p}><rect x="12" y="22" width="40" height="4" rx="2" /><path d="M18 26 L22 46 H42 L46 26" /><path d="M32 46 V54" /><path d="M24 54 H40" /><path d="M22 14 Q32 8 42 14" /><path d="M26 10 V6" /><path d="M32 10 V6" /><path d="M38 10 V6" /></svg>,
      appetizers: <svg {...p}><path d="M10 42 Q10 22 32 22 Q54 22 54 42" /><ellipse cx="32" cy="43" rx="22" ry="5" /><path d="M24 22 Q24 14 32 14 Q40 14 40 22" /></svg>,
      salad: <svg {...p}><path d="M32 54 C18 42 12 30 12 22 C12 14 20 10 32 10 C44 10 52 14 52 22 C52 30 46 42 32 54Z" /><path d="M32 10 L32 54" /><path d="M12 26 Q32 32 52 26" /></svg>,
      sandwich: <svg {...p}><rect x="12" y="12" width="40" height="8" rx="4" /><path d="M14 20 H50" /><rect x="14" y="20" width="36" height="10" rx="1" /><path d="M14 30 H50" /><rect x="12" y="30" width="40" height="8" rx="4" /><path d="M20 42 Q32 46 44 42" /></svg>,
      meals: <svg {...p}><ellipse cx="32" cy="46" rx="22" ry="4.5" /><path d="M10 46 Q10 26 32 26 Q54 26 54 46" /><path d="M20 26 Q20 14 32 14 Q44 14 44 26" /><path d="M8 46 H56" /></svg>,
      east: <svg {...p}><path d="M20 52 L16 28 Q16 12 32 12 Q48 12 48 28 L44 52Z" /><path d="M24 12 L22 6 H42 L40 12" /><path d="M17 36 H47" /><path d="M18 44 H46" /></svg>,
      dessert: <svg {...p}><rect x="14" y="44" width="36" height="8" rx="3" /><rect x="20" y="28" width="24" height="16" rx="2" /><path d="M32 28 Q32 18 24 14 Q32 10 40 14 Q32 18 32 28" /><path d="M28 12 V8 H36 V12" /></svg>,
      hotdrinks: <svg {...p}><path d="M16 22 H44 L40 54 H20Z" /><path d="M44 32 Q54 32 54 42 Q54 52 44 52" /><path d="M24 16 Q26 8 30 12" /><path d="M32 14 Q34 6 38 10" /></svg>,
      juices: <svg {...p}><path d="M20 16 L16 54 H48 L44 16Z" /><path d="M18 30 H46" /><path d="M26 10 Q32 4 38 10" /><path d="M30 8 V4" /><path d="M34 8 V4" /></svg>
    }
    return icons[icon] || icons['meals']
  }

  return (
    <section id="menu" className="menu">
      <div className="menu-header">
        <p className="menu-tag">المنيو</p>
        <h2 className="menu-title">اختر ما يشتهيه قلبك</h2>
        <div className="menu-divider"></div>
      </div>

      {!selectedCategory ? (
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => setSelectedCategory(category.id)}
              style={{
                animation: `scrollReveal 0.7s ease ${0.08 * index}s backwards`
              }}
            >
              <div className="category-card-image" style={{ backgroundImage: `url(${category.image})` }} />
              <div className="category-card-overlay" />
              <span className="category-badge">{category.itemCount} صنف</span>
              <div className="category-label">
                <h3>{category.label}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button className="back-button" onClick={() => setSelectedCategory(null)}>
            ← الكل
          </button>
          <div className="selected-category-header">
            <h2>{categories.find(c => c.id === selectedCategory)?.label}</h2>
          </div>
          <div className="items-grid">
            {(menuItems[selectedCategory] ?? []).map((item, index) => (
              <div
                key={item.id}
                className="item-card"
                style={{
                  animation: `scrollReveal 0.7s ease ${0.06 * index}s backwards`
                }}
              >
                <div className="item-card-image">
                  <img
                    src={item.image ?? categories.find(c => c.id === selectedCategory)?.image}
                    alt={item.name}
                  />
                 
                  
                </div>
                <div className="item-body">
                  <h3 className="item-name">{item.name}</h3>
                  {item.description && (
                    <p className="item-description">{item.description}</p>
                  )}
                  <div className="item-prices">
                    {item.prices ? (
                      item.prices.map((p, i) => (
                        <div key={i} className="price-row">
                          <span className="price-label">{p.label}</span>
                          <span className="price-dots" />
                          <span className="price-value">₪ {p.value}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        {item.priceLarge != null && (
                          <div className="price-row">
                            <span className="price-label">{item.priceLargeLabel || 'صحن كبير'}</span>
                            <span className="price-dots" />
                            <span className="price-value">₪ {item.priceLarge}</span>
                          </div>
                        )}
                        {item.priceSmall != null && (
                          <div className="price-row">
                            <span className="price-label">{item.priceSmallLabel || 'صحن صغير'}</span>
                            <span className="price-dots" />
                            <span className="price-value">₪ {item.priceSmall}</span>
                          </div>
                        )}
                        {item.towPerson != null && item.priceSmall != null && (
                          <div className="price-row">
                            <span className="price-label">{item.towPerson}</span>
                            <span className="price-dots" />
                            <span className="price-value">₪ {item.priceSmall}</span>
                          </div>
                        )}
                        {item.price != null && item.priceLarge == null && (
                          <div className="price-row">
                            <span className="price-label">{item.priceLabel || 'السعر'}</span>
                            <span className="price-dots" />
                            <span className="price-value">₪ {item.price}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    className={`add-to-cart-btn ${addedItems[item.id] ? 'added' : ''}`}
                    onClick={() => setModalItem({ item, categoryImage: categories.find(c => c.id === selectedCategory)?.image })}
                  >
                    {addedItems[item.id] ? '✓ تمت الإضافة' : 'أضف للسلة'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {(() => {
            const note = categories.find(c => c.id === selectedCategory)?.note
            return note ? <p className="category-note">✦ {note}</p> : null
          })()}
        </>
      )}
      {modalItem && (
        <ItemModal
          item={modalItem.item}
          categoryImage={modalItem.categoryImage}
          onClose={() => setModalItem(null)}
          onAdd={handleAddToCart}
        />
      )}
    </section>
  )
}

export default Menu
