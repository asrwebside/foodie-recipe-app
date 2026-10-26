import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

const initialRecipes = [
  {
    id: '1',
    name: 'Nigerian Jollof Rice',
    category: 'Lunch',
    time: '45 min',
    servings: 4,
    calories: 420,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    ingredients: ['2 cups rice', '4 tomatoes', '1 red bell pepper', '1 onion', 'Tomato paste', 'Chicken stock', 'Oil, salt and spices'],
    instructions: ['Blend tomatoes, pepper and onion.', 'Fry tomato paste in oil.', 'Add the blended mixture and seasonings.', 'Add washed rice and stock.', 'Cover and cook until rice is tender.'],
  },
  {
    id: '2',
    name: 'Grilled Chicken',
    category: 'Chicken',
    time: '40 min',
    servings: 2,
    calories: 350,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800',
    ingredients: ['2 chicken breasts', '2 tablespoons olive oil', 'Garlic', 'Paprika', 'Salt and pepper', 'Lemon juice'],
    instructions: ['Mix oil, garlic, lemon and spices.', 'Coat the chicken in the marinade.', 'Leave for 15 minutes.', 'Grill until thoroughly cooked.', 'Rest briefly before serving.'],
  },
  {
    id: '3',
    name: 'Fluffy Pancakes',
    category: 'Breakfast',
    time: '20 min',
    servings: 3,
    calories: 250,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800',
    ingredients: ['1 cup flour', '1 egg', '3/4 cup milk', '1 tablespoon sugar', 'Baking powder', 'Butter'],
    instructions: ['Mix the dry ingredients.', 'Whisk egg and milk together.', 'Combine wet and dry ingredients.', 'Pour batter into a buttered pan.', 'Flip and cook until golden.'],
  },
  {
    id: '4',
    name: 'Fresh Vegetable Salad',
    category: 'Vegetarian',
    time: '15 min',
    servings: 2,
    calories: 180,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    ingredients: ['Lettuce', '1 cucumber', '2 tomatoes', '1 carrot', 'Olive oil', 'Lemon juice'],
    instructions: ['Wash all vegetables.', 'Chop the vegetables.', 'Grate the carrot.', 'Combine everything in a bowl.', 'Add dressing and toss.'],
  },
  {
    id: '5',
    name: 'Chocolate Cake',
    category: 'Desserts',
    time: '50 min',
    servings: 8,
    calories: 380,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    ingredients: ['2 cups flour', 'Cocoa powder', 'Sugar', '2 eggs', 'Milk', 'Butter', 'Baking powder'],
    instructions: ['Preheat oven to 180°C.', 'Mix dry ingredients.', 'Add eggs, milk and butter.', 'Pour into a baking pan.', 'Bake until cooked through.'],
  },
  {
    id: '6',
    name: 'Seafood Pasta',
    category: 'Seafood',
    time: '30 min',
    servings: 2,
    calories: 460,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
    ingredients: ['200 g pasta', '200 g shrimp', 'Garlic', 'Olive oil', 'Tomato sauce', 'Salt and pepper'],
    instructions: ['Cook the pasta.', 'Sauté garlic in olive oil.', 'Cook shrimp thoroughly.', 'Add tomato sauce and seasonings.', 'Mix with pasta and serve.'],
  },
  {
    id: '7',
    name: 'Beef Burger',
    category: 'Snacks',
    time: '25 min',
    servings: 2,
    calories: 500,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    ingredients: ['2 burger buns', 'Ground beef patties', 'Lettuce', 'Tomato', 'Cheese', 'Burger sauce'],
    instructions: ['Season the beef patties.', 'Cook patties thoroughly.', 'Toast the buns.', 'Layer the vegetables, cheese and patties.', 'Add sauce and serve.'],
  },
  {
    id: '8',
    name: 'Fresh Fruit Smoothie',
    category: 'Drinks',
    time: '10 min',
    servings: 2,
    calories: 190,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=800',
    ingredients: ['1 banana', '1 cup strawberries', '1 cup milk', 'Yogurt', 'Ice cubes'],
    instructions: ['Wash the fruit.', 'Peel and chop the banana.', 'Add ingredients to a blender.', 'Blend until smooth.', 'Serve immediately.'],
  },
  {
    id: '9',
    name: 'Creamy Chicken Pasta',
    category: 'Dinner',
    time: '35 min',
    servings: 3,
    calories: 440,
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
    ingredients: ['Pasta', 'Chicken breast', 'Cream', 'Garlic', 'Parmesan cheese', 'Black pepper'],
    instructions: ['Cook pasta until tender.', 'Cut and cook chicken thoroughly.', 'Sauté garlic.', 'Add cream and cheese.', 'Combine sauce, chicken and pasta.'],
  },
  {
    id: '10',
    name: 'Vegetable Fried Rice',
    category: 'Lunch',
    time: '30 min',
    servings: 4,
    calories: 320,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    ingredients: ['Cooked rice', 'Carrots', 'Green peas', 'Sweet corn', 'Spring onions', 'Cooking oil and spices'],
    instructions: ['Dice the vegetables.', 'Heat oil in a pan.', 'Stir-fry the vegetables.', 'Add cooked rice and seasonings.', 'Stir well and serve hot.'],
  },
];

const categories = [
  'All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks',
  'Desserts', 'Vegetarian', 'Chicken', 'Seafood',
  'Drinks', 'My Food',
];

export default function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [screen, setScreen] = useState('Home');
  const [previousScreen, setPreviousScreen] = useState('Home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: '',
    image: '',
    ingredients: '',
    instructions: '',
    category: 'Lunch',
    time: '30 min',
    servings: '2',
    calories: '300',
    difficulty: 'Easy',
  };

  const [form, setForm] = useState(emptyForm);

  const myRecipes = recipes.filter((r) => r.isMine);

  const visibleRecipes = recipes.filter((r) => {
    const matchesCategory =
      category === 'All' ||
      (category === 'My Food' && r.isMine) ||
      (category !== 'My Food' && category !== 'Favorites' && r.category === category) ||
      (category === 'Favorites' && favorites.includes(r.id));

    const matchesScreen =
      screen === 'Favorites'
        ? favorites.includes(r.id)
        : screen === 'MyRecipes'
        ? r.isMine
        : screen === 'Home'
        ? matchesCategory
        : false;

    return matchesScreen &&
      r.name.toLowerCase().includes(search.toLowerCase());
  });

  const goTo = (next) => {
    setPreviousScreen(screen);
    setScreen(next);
  };

  const goBack = () => {
    if (screen === 'Details') {
      setScreen(previousScreen === 'Details' ? 'Home' : previousScreen);
      return;
    }
    if (screen === 'AddRecipe') {
      setScreen(editingId ? 'MyRecipes' : 'Home');
      return;
    }
    setScreen('Home');
  };

  const openRecipe = (recipe, from = screen) => {
    setPreviousScreen(from);
    setSelectedRecipe(recipe);
    setScreen('Details');
  };

  const toggleFavorite = (id) => {
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id]
    );
  };

  const updateForm = (key, value) => {
    setForm((old) => ({ ...old, [key]: value }));
  };

  const chooseImage = async () => {
    try {
   const chooseImage = () => {
  Alert.alert(
    'Recipe Image',
    'Paste an image URL into the Image URL field.'
  );
};
      if (!result.canceled && result.assets?.length) {
        updateForm('image', result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert('Image selection', 'Image picker is not available in this preview. You can paste an image URL into the image field instead.');
    }
  };

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setScreen('AddRecipe');
  };

  const startEdit = (recipe) => {
    setEditingId(recipe.id);
    setForm({
      name: recipe.name,
      image: recipe.image || '',
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
      category: recipe.category,
      time: recipe.time,
      servings: String(recipe.servings),
      calories: String(recipe.calories),
      difficulty: recipe.difficulty,
    });
    setScreen('AddRecipe');
  };

  const saveRecipe = () => {
    if (!form.name.trim() || !form.ingredients.trim() || !form.instructions.trim()) {
      Alert.alert('Missing information', 'Enter the recipe name, ingredients and instructions.');
      return;
    }

    const ingredients = form.ingredients.split('\n').map((s) => s.trim()).filter(Boolean);
    const instructions = form.instructions.split('\n').map((s) => s.trim()).filter(Boolean);

    if (!ingredients.length || !instructions.length) {
      Alert.alert('Missing information', 'Add at least one ingredient and one instruction.');
      return;
    }

    const recipeData = {
      ...form,
      name: form.name.trim(),
      image: form.image.trim() || 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
      ingredients,
      instructions,
      servings: Number(form.servings) || 2,
      calories: Number(form.calories) || 300,
      isMine: true,
    };

    if (editingId) {
      setRecipes((old) => old.map((r) => r.id === editingId ? { ...r, ...recipeData } : r));
      if (selectedRecipe?.id === editingId) setSelectedRecipe({ ...selectedRecipe, ...recipeData });
      Alert.alert('Recipe updated', 'Your changes have been saved.');
    } else {
      setRecipes((old) => [...old, { ...recipeData, id: String(Date.now()) }]);
      Alert.alert('Recipe saved', 'Your recipe has been added to My Recipes.');
    }
    setForm(emptyForm);
    setEditingId(null);
    setScreen('MyRecipes');
  };

  const deleteRecipe = (id) => {
    Alert.alert('Delete recipe', 'Are you sure you want to delete this recipe?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setRecipes((old) => old.filter((r) => r.id !== id));
          setFavorites((old) => old.filter((x) => x !== id));
          if (selectedRecipe?.id === id) setScreen('MyRecipes');
        },
      },
    ]);
  };

  const renderRecipeCard = (recipe) => (
    <TouchableOpacity
      key={recipe.id}
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => openRecipe(recipe)}
    >
      <Image source={{ uri: recipe.image }} style={styles.cardImage} />
      <TouchableOpacity
        style={styles.heart}
        onPress={() => toggleFavorite(recipe.id)}
      >
        <Text style={styles.heartText}>
          {favorites.includes(recipe.id) ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{recipe.name}</Text>
        <Text style={styles.cardCategory}>{recipe.category}</Text>
        <Text style={styles.muted}>🕒 {recipe.time}  ·  {recipe.difficulty}</Text>
        {recipe.isMine && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => startEdit(recipe)}>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecipe(recipe.id)}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderDetails = () => selectedRecipe && (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={{ uri: selectedRecipe.image }} style={styles.detailImage} />
      <View style={styles.detailContent}>
        <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
        <Text style={styles.cardCategory}>{selectedRecipe.category}</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{selectedRecipe.time}</Text>
            <Text style={styles.muted}>Prep time</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{selectedRecipe.servings}</Text>
            <Text style={styles.muted}>Servings</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{selectedRecipe.calories}</Text>
            <Text style={styles.muted}>Calories</Text>
          </View>
        </View>

        <Text style={styles.difficulty}>Difficulty: {selectedRecipe.difficulty}</Text>

        <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(selectedRecipe.id)}>
          <Text style={styles.favoriteButtonText}>
            {favorites.includes(selectedRecipe.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {selectedRecipe.ingredients.map((item, i) => (
          <Text key={i} style={styles.detailItem}>•  {item}</Text>
        ))}

        <Text style={styles.sectionTitle}>Instructions</Text>
        {selectedRecipe.instructions.map((item, i) => (
          <Text key={i} style={styles.detailItem}>{i + 1}.  {item}</Text>
        ))}

        {selectedRecipe.isMine && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.editButton} onPress={() => startEdit(selectedRecipe)}>
              <Text style={styles.actionText}>Edit Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecipe(selectedRecipe.id)}>
              <Text style={styles.actionText}>Delete Recipe</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderForm = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.form}>
        <Text style={styles.formTitle}>{editingId ? 'Edit Recipe' : 'Add New Recipe'}</Text>

        <Text style={styles.label}>Recipe name *</Text>
        <TextInput style={styles.input} placeholder="Enter recipe name" value={form.name} onChangeText={(v) => updateForm('name', v)} />

        <Text style={styles.label}>Image URL (optional)</Text>
        <TextInput style={styles.input} placeholder="Paste image URL or choose a photo below" value={form.image} onChangeText={(v) => updateForm('image', v)} autoCapitalize="none" />
        <TouchableOpacity style={styles.secondaryButton} onPress={chooseImage}>
          <Text style={styles.secondaryButtonText}>Choose Image from Device</Text>
        </TouchableOpacity>
        {!!form.image && <Image source={{ uri: form.image }} style={styles.previewImage} />}

        <Text style={styles.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.filter((c) => c !== 'All' && c !== 'My Food').map((c) => (
            <TouchableOpacity key={c} onPress={() => updateForm('category', c)} style={[styles.categoryChip, form.category === c && styles.categorySelected]}>
              <Text style={[styles.categoryText, form.category === c && { color: '#fff' }]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Ingredients * (one per line)</Text>
        <TextInput style={[styles.input, styles.multiline]} multiline placeholder={'2 cups rice\n1 onion\nSalt'} value={form.ingredients} onChangeText={(v) => updateForm('ingredients', v)} />

        <Text style={styles.label}>Step-by-step instructions * (one step per line)</Text>
        <TextInput style={[styles.input, styles.multiline]} multiline placeholder={'Wash the rice.\nChop the onion.\nCook and serve.'} value={form.instructions} onChangeText={(v) => updateForm('instructions', v)} />

        <Text style={styles.label}>Preparation time</Text>
        <TextInput style={styles.input} placeholder="e.g. 30 min" value={form.time} onChangeText={(v) => updateForm('time', v)} />

        <Text style={styles.label}>Number of servings</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={form.servings} onChangeText={(v) => updateForm('servings', v)} />

        <Text style={styles.label}>Calories</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={form.calories} onChangeText={(v) => updateForm('calories', v)} />

        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.row}>
          {['Easy', 'Medium', 'Hard'].map((d) => (
            <TouchableOpacity key={d} onPress={() => updateForm('difficulty', d)} style={[styles.categoryChip, form.difficulty === d && styles.categorySelected]}>
              <Text style={[styles.categoryText, form.difficulty === d && { color: '#fff' }]}>{d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveRecipe}>
          <Text style={styles.saveButtonText}>{editingId ? 'Update Recipe' : 'Save Recipe'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.headerBack}>
          {screen !== 'Home' && <Text style={styles.backText}>‹ Back</Text>}
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.logo}>Foodie.</Text>
          <Text style={styles.subtitle}>Discover something delicious</Text>
        </View>
        <Text style={styles.chef}>🍳</Text>
      </View>

      {screen === 'Home' && (
        <>
          <TextInput style={styles.search} placeholder="Search delicious recipes..." value={search} onChangeText={setSearch} />
          <Text style={styles.sectionTitle}>Explore Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            {categories.map((c) => (
              <TouchableOpacity key={c} style={[styles.categoryChip, category === c && styles.categorySelected]} onPress={() => {
                setCategory(c);
                if (c === 'My Food') setScreen('MyRecipes');
              }}>
                <Text style={[styles.categoryText, category === c && { color: '#fff' }]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.listHeading}>{category === 'All' ? 'Popular Recipes' : category === 'My Food' ? 'My Recipes' : category + ' Recipes'}</Text>
          <ScrollView contentContainerStyle={styles.list}>
            {visibleRecipes.map(renderRecipeCard)}
            {visibleRecipes.length === 0 && <Text style={styles.empty}>No recipes found.</Text>}
          </ScrollView>
        </>
      )}

      {screen === 'Favorites' && (
        <>
          <Text style={styles.listHeading}>My Favorites ❤️</Text>
          <ScrollView contentContainerStyle={styles.list}>
            {visibleRecipes.map(renderRecipeCard)}
            {visibleRecipes.length === 0 && <Text style={styles.empty}>No favorites yet. Tap a heart on any recipe!</Text>}
          </ScrollView>
        </>
      )}

      {screen === 'MyRecipes' && (
        <>
          <View style={styles.myHeader}>
            <Text style={styles.listHeading}>My Recipes</Text>
            <TouchableOpacity style={styles.addButton} onPress={startAdd}>
              <Text style={styles.addButtonText}>＋ Add New Recipe</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.list}>
            {myRecipes.map(renderRecipeCard)}
            {myRecipes.length === 0 && <Text style={styles.empty}>You haven't added recipes yet. Tap Add New Recipe to begin.</Text>}
          </ScrollView>
        </>
      )}

      {screen === 'Details' && renderDetails()}
      {screen === 'AddRecipe' && renderForm()}

      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => { setScreen('Home'); setCategory('All'); setSearch(''); }}>
          <Text style={[styles.bottomText, screen === 'Home' && styles.bottomActive]}>⌂ Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setSearch(''); setScreen('Favorites'); }}>
          <Text style={[styles.bottomText, screen === 'Favorites' && styles.bottomActive]}>♥ Favorites ({favorites.length})</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setSearch(''); setScreen('MyRecipes'); }}>
          <Text style={[styles.bottomText, screen === 'MyRecipes' && styles.bottomActive]}>＋ My Food</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFDF8', paddingTop: Platform.OS === 'android' ? 8 : 0 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 10 },
  headerBack: { minWidth: 0, marginRight: 8 },
  backText: { color: '#E66B35', fontSize: 16, fontWeight: 'bold' },
  logo: { fontSize: 30, fontWeight: 'bold', color: '#E66B35' },
  subtitle: { color: '#777', marginTop: 2, fontSize: 12 },
  chef: { fontSize: 30, marginLeft: 10 },
  search: { backgroundColor: '#F1EEE8', borderRadius: 14, marginHorizontal: 18, marginVertical: 10, paddingHorizontal: 15, paddingVertical: 12, fontSize: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#252525', marginHorizontal: 18, marginTop: 12, marginBottom: 12 },
  categoryList: { flexGrow: 0, maxHeight: 50, marginBottom: 12, paddingLeft: 18 },
  categoryChip: { backgroundColor: '#F0EDE6', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 22, marginRight: 8, marginBottom: 5 },
  categorySelected: { backgroundColor: '#E66B35' },
  categoryText: { color: '#555', fontWeight: '600', fontSize: 13 },
  listHeading: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 18, marginVertical: 12, color: '#252525' },
  list: { paddingHorizontal: 18, paddingBottom: 25 },
  card: { backgroundColor: '#fff', borderRadius: 18, marginBottom: 18, overflow: 'hidden', borderWidth: 1, borderColor: '#F0ECE5' },
  cardImage: { width: '100%', height: 190, backgroundColor: '#EEE' },
  heart: { position: 'absolute', top: 12, right: 12, backgroundColor: '#fff', borderRadius: 25, width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  heartText: { fontSize: 21 },
  cardInfo: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#292929' },
  cardCategory: { color: '#E66B35', marginTop: 6, marginBottom: 5 },
  muted: { color: '#777', fontSize: 13, marginTop: 5 },
  empty: { color: '#777', textAlign: 'center', paddingHorizontal: 25, paddingVertical: 35, lineHeight: 22 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#EEE8DF', backgroundColor: '#fff' },
  bottomText: { color: '#666', fontSize: 12, fontWeight: '600' },
  bottomActive: { color: '#E66B35' },
  detailImage: { width: '100%', height: 250, backgroundColor: '#EEE' },
  detailContent: { padding: 20, paddingBottom: 35 },
  detailTitle: { fontSize: 27, fontWeight: 'bold', color: '#252525' },
  stats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 22, marginBottom: 15, backgroundColor: '#F3F0E9', padding: 14, borderRadius: 14 },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: '#292929', fontWeight: 'bold', fontSize: 15 },
  difficulty: { fontSize: 15, color: '#555', fontWeight: '600', marginVertical: 12 },
  favoriteButton: { backgroundColor: '#FFF0E8', borderRadius: 12, padding: 14, alignItems: 'center', marginVertical: 12 },
  favoriteButtonText: { color: '#C95728', fontWeight: 'bold' },
  detailItem: { fontSize: 15, lineHeight: 24, color: '#555', marginBottom: 10 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  editButton: { flex: 1, backgroundColor: '#E66B35', padding: 11, borderRadius: 10, alignItems: 'center' },
  deleteButton: { flex: 1, backgroundColor: '#B83232', padding: 11, borderRadius: 10, alignItems: 'center' },
  actionText: { color: '#fff', fontWeight: 'bold' },
  myHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 18 },
  addButton: { backgroundColor: '#E66B35', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  form: { padding: 18, paddingBottom: 35 },
  formTitle: { fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: '#252525' },
  label: { fontWeight: 'bold', color: '#333', marginTop: 14, marginBottom: 7 },
  input: { backgroundColor: '#F4F1EB', borderRadius: 10, paddingHorizontal: 13, paddingVertical: 12, fontSize: 15, color: '#222' },
  multiline: { minHeight: 110, textAlignVertical: 'top' },
  secondaryButton: { marginTop: 9, borderWidth: 1, borderColor: '#E66B35', borderRadius: 10, padding: 12, alignItems: 'center' },
  secondaryButtonText: { color: '#D65E2B', fontWeight: 'bold' },
  previewImage: { height: 160, width: '100%', marginTop: 10, borderRadius: 12 },
  row: { flexDirection: 'row', marginTop: 5 },
  saveButton: { backgroundColor: '#E66B35', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 25 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
