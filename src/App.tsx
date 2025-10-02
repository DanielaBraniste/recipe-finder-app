import React, { useState, useEffect } from 'react';
import { Search, ChefHat, Globe, Sparkles, Calendar, ShoppingCart, ChevronDown, ChevronUp, X, Download } from 'lucide-react';

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  name: string;
  cuisine: string;
  continent: string;
  ingredients: Ingredient[];
  instructions: string;
  type: string;
  servings: number;
  calories_per_serving: number;
}

const App: React.FC = () => {
  // Recipe Finder State
  const [ingredients, setIngredients] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // Meal Planner State
  const [activeTab, setActiveTab] = useState<string>('finder');
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [dietaryPreference, setDietaryPreference] = useState<string>('omnivore');
  const [mealPlan, setMealPlan] = useState<Recipe[]>([]);
  const [shoppingList, setShoppingList] = useState<{[key: string]: Ingredient[]}>({});
  const [hasMealPlan, setHasMealPlan] = useState<boolean>(false);
  const [expandedCards, setExpandedCards] = useState<{[key: number]: boolean}>({});
  
  // PWA Install Prompt State
  const [showPWAPrompt, setShowPWAPrompt] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const pwaPromptDismissed = localStorage.getItem('pwaPromptDismissed');
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      if (!pwaPromptDismissed && !isStandalone) {
        setTimeout(() => {
          setShowPWAPrompt(true);
        }, 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('To install this app:\n\n• On iOS: Tap the Share button and select "Add to Home Screen"\n• On Android: Tap the menu and select "Install App" or "Add to Home Screen"');
    }
    setShowPWAPrompt(false);
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

  const dismissPWAPrompt = () => {
    setShowPWAPrompt(false);
    localStorage.setItem('pwaPromptDismissed', 'true');
  };

const [recipeDatabase, setRecipeDatabase] = useState<Recipe[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch('/recipes.json')
    .then(res => res.json())
    .then(data => {
      setRecipeDatabase(data);
      setIsLoading(false);
    })
    .catch(err => {
      console.error('Failed to load recipes:', err);
      setIsLoading(false);
    });
}, []);

  const cuisines = Array.from(new Set(recipeDatabase.map(recipe => recipe.cuisine))).sort();
  
  const continentOptions = [
    { display: 'Asian', value: 'Asia' },
    { display: 'European', value: 'Europe' },
    { display: 'African', value: 'Africa' },
    { display: 'North American', value: 'North America' },
    { display: 'South American', value: 'South America' },
    { display: 'Oceanian', value: 'Oceania' },
    { display: 'Caribbean', value: 'Caribbean' }
  ];
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Recipe Finder Functions
  const findMatchingRecipes = (): Recipe[] => {
    if (!ingredients.trim()) return [];

    const ingredientList = ingredients.toLowerCase().split(',').map(ing => ing.trim()).filter(ing => ing.length > 0);
    
    const matchingRecipes = recipeDatabase.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
      
      const commonSpices = [
        'salt', 'pepper', 'black pepper', 'white pepper', 'garlic', 'onion', 'ginger', 
        'paprika', 'cumin', 'oregano', 'thyme', 'basil', 'rosemary', 'cinnamon', 
        'cardamom', 'turmeric', 'coriander', 'bay leaves', 'chili powder', 'curry powder', 
        'soy sauce', 'vinegar', 'oil', 'olive oil', 'sesame oil', 'butter', 'flour', 
        'sugar', 'honey', 'lemon', 'lime', 'vanilla', 'baking powder', 'baking soda',
        'garlic powder', 'chili spices', 'berbere spice', 'fresh herbs', 'herbs'
      ];
      
      let missingIngredients = 0;
      let hasUserIngredients = false;
      
      for (const recipeIng of recipeIngredients) {
        const userHasIngredient = ingredientList.some(userIng => 
          recipeIng.includes(userIng) || userIng.includes(recipeIng)
        );
        
        const isCommonSpice = commonSpices.some(spice => 
          recipeIng.includes(spice) || spice.includes(recipeIng)
        );
        
        if (userHasIngredient) {
          hasUserIngredients = true;
        } else if (!isCommonSpice) {
          missingIngredients++;
        }
      }
      
      const cuisineMatch = selectedCuisine === 'all' || selectedCuisine === 'surprise' || recipe.cuisine === selectedCuisine;
      
      return hasUserIngredients && missingIngredients <= 2 && cuisineMatch;
    });

    if (selectedCuisine === 'surprise') {
      return matchingRecipes.sort(() => Math.random() - 0.5).slice(0, 3);
    }
    
    return matchingRecipes.slice(0, 3);
  };

  const handleSearch = () => {
    const results = findMatchingRecipes();
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleSurpriseMe = () => {
    setSelectedCuisine('surprise');
    setTimeout(() => {
      const results = findMatchingRecipes();
      setSearchResults(results);
      setHasSearched(true);
    }, 100);
  };

  // Meal Planner Functions
  const handleContinentToggle = (continentValue: string) => {
    setSelectedContinents(prev => 
      prev.includes(continentValue) 
        ? prev.filter(c => c !== continentValue)
        : [...prev, continentValue]
    );
  };

  const generateMealPlan = () => {
    if (selectedContinents.length === 0) {
      alert('Please select at least one continent for your meal plan.');
      return;
    }

    let availableRecipes = recipeDatabase.filter(recipe => {
      const continentMatch = selectedContinents.includes(recipe.continent);
      
      let dietaryMatch = false;
      if (dietaryPreference === 'omnivore') {
        dietaryMatch = true;
      } else if (dietaryPreference === 'pescatarian') {
        dietaryMatch = recipe.type === 'seafood';
      } else if (dietaryPreference === 'vegetarian') {
        dietaryMatch = recipe.type === 'vegetarian' || recipe.type === 'vegan';
      } else if (dietaryPreference === 'vegan') {
        dietaryMatch = recipe.type === 'vegan';
      }
      
      return continentMatch && dietaryMatch;
    });

    if (availableRecipes.length < 7) {
      alert('Not enough recipes available with your selected criteria. Please select more continents or change dietary preferences.');
      return;
    }

    const selectedRecipes: Recipe[] = [];
    const usedRecipes = new Set<string>();

    while (selectedRecipes.length < 7 && availableRecipes.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableRecipes.length);
      const recipe = availableRecipes[randomIndex];
      
      if (!usedRecipes.has(recipe.name)) {
        selectedRecipes.push(recipe);
        usedRecipes.add(recipe.name);
      }
      
      availableRecipes.splice(randomIndex, 1);
    }

    setMealPlan(selectedRecipes);
    generateShoppingList(selectedRecipes);
    setHasMealPlan(true);
    setExpandedCards({});
  };

  const toggleCardExpansion = (index: number) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const generateShoppingList = (recipes: Recipe[]) => {
    const allIngredients = new Map<string, Ingredient>();
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach((ingredient) => {
        const key = ingredient.name.toLowerCase();
        if (allIngredients.has(key)) {
          const existing = allIngredients.get(key)!;
          if (existing.unit === ingredient.unit) {
            existing.quantity += ingredient.quantity;
          } else {
            const newKey = `${key}_${ingredient.unit}`;
            allIngredients.set(newKey, {
              name: ingredient.name,
              quantity: ingredient.quantity,
              unit: ingredient.unit
            });
          }
        } else {
          allIngredients.set(key, {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit
          });
        }
      });
    });

    const categories: {[key: string]: string[]} = {
      'Proteins': ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'seafood', 'eggs', 'lamb', 'bacon', 'steak', 'ground beef', 'white fish', 'barramundi', 'mixed seafood', 'pisco', 'anchovy'],
      'Grains & Starches': ['rice', 'pasta', 'spaghetti', 'noodles', 'bread', 'couscous', 'pastry', 'pizza dough', 'tortillas', 'injera bread', 'corn tortillas', 'pastry sheets'],
      'Vegetables': ['onions', 'garlic', 'tomatoes', 'peppers', 'vegetables', 'mushrooms', 'carrots', 'broccoli', 'bell peppers', 'bean sprouts', 'cabbage', 'lettuce', 'cucumber', 'mixed vegetables', 'diced tomatoes', 'red onions'],
      'Dairy & Cheese': ['parmesan cheese', 'mozzarella cheese', 'feta cheese', 'egg white'],
      'Pantry Items': ['olive oil', 'soy sauce', 'vinegar', 'teriyaki sauce', 'bbq sauce', 'tomato sauce', 'caesar dressing', 'red wine vinegar', 'lime juice', 'beef stock'],
      'Herbs & Spices': ['basil', 'parsley', 'oregano', 'cilantro', 'cinnamon', 'paprika', 'black pepper', 'berbere spice', 'herbs', 'fresh basil', 'fresh parsley', 'fresh herbs', 'garlic powder', 'chili spices', 'cumin', 'sesame seeds', 'saffron'],
      'Fruits & Nuts': ['lime', 'lemon', 'banana', 'mixed berries', 'dried apricots', 'almonds'],
      'Pantry Staples': ['honey', 'simple syrup', 'granola', 'croutons', 'brown sugar', 'bitters', 'açaí puree', 'mixed beans', 'black beans', 'maple syrup'],
      'Other': []
    };

    const categorizedIngredients: {[key: string]: Ingredient[]} = {};
    
    Object.keys(categories).forEach(category => {
      categorizedIngredients[category] = [];
    });

    Array.from(allIngredients.entries()).forEach(([key, ingredient]) => {
      let categorized = false;
      
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => ingredient.name.toLowerCase().includes(keyword) || keyword.includes(ingredient.name.toLowerCase()))) {
          categorizedIngredients[category].push(ingredient);
          categorized = true;
          break;
        }
      }
      
      if (!categorized) {
        categorizedIngredients['Other'].push(ingredient);
      }
    });

    setShoppingList(categorizedIngredients);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* PWA Install Prompt */}
      {showPWAPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-2xl border-2 border-orange-200 p-5 z-50 animate-slide-up">
          <button
            onClick={dismissPWAPrompt}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-start space-x-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl flex-shrink-0">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-1">Install Kitchen Planner</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add to your home screen for quick access to recipes and meal plans!
              </p>
              <button
                onClick={handleInstallPWA}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold text-sm shadow-lg flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Install App</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Kitchen Planner
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="w-4 h-4" />
            <span>Global Cuisine</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('finder')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
              activeTab === 'finder'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500'
                : 'border-orange-200 text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Recipe Finder
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
              activeTab === 'planner'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-500'
                : 'border-green-200 text-green-600 hover:bg-green-50'
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Meal Planner
          </button>
        </div>
      </div>

      {/* Recipe Finder Tab */}
      {activeTab === 'finder' && (
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            What's in Your 
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Fridge</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Tell us what ingredients you have, and we'll find amazing recipes from around the world that you can make right now!
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-3 text-left">
                  Available Ingredients
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Enter ingredients separated by commas (e.g., chicken, rice, tomatoes, onions)"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-lg font-semibold text-gray-700 mb-3 text-left">
                    Preferred Cuisine
                  </label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                  >
                    <option value="all">All Cuisines</option>
                    {cuisines.map(cuisine => (
                      <option key={cuisine} value={cuisine}>{cuisine}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <button
                    onClick={handleSurpriseMe}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Surprise Me!</span>
                  </button>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={!ingredients.trim()}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Find My Recipes
              </button>
            </div>
          </div>

          {hasSearched && (
            <div className="text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {searchResults.length > 0 ? 'Perfect Matches!' : 'No Recipes Found'}
              </h3>
              
              {searchResults.length === 0 ? (
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
                  <p className="text-gray-600 text-lg">
                    Sorry, we couldn't find any recipes that match your available ingredients. 
                    Try adding more common ingredients or selecting "All Cuisines" to see more options.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((recipe, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                        <h4 className="text-white font-bold text-xl mb-2">{recipe.name}</h4>
                        <p className="text-orange-100">{recipe.cuisine} • {recipe.continent}</p>
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-700 mb-2">Ingredients:</h5>
                          <div className="flex flex-wrap gap-2">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <span key={idx} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-700 mb-2">Instructions:</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {recipe.instructions}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasSearched && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">25+</div>
                <div className="text-gray-600">Recipes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">150+</div>
                <div className="text-gray-600">Ingredients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">15+</div>
                <div className="text-gray-600">Cuisines</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">∞</div>
                <div className="text-gray-600">Possibilities</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Meal Planner Tab */}
      {activeTab === 'planner' && (
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Weekly 
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"> Meal Plan</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Select your favorite continents and dietary preferences to create a 7-day meal plan with a complete shopping list!
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4 text-left">
                  Select Continents for Your Week
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-left">
                  {continentOptions.map(continent => (
                    <label key={continent.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedContinents.includes(continent.value)}
                        onChange={() => handleContinentToggle(continent.value)}
                        className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{continent.display}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-lg font-semibold text-gray-700 mb-3 text-left">
                    Dietary Preferences
                  </label>
                  <select
                    value={dietaryPreference}
                    onChange={(e) => setDietaryPreference(e.target.value)}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                  >
                    <option value="omnivore">Omnivore</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>
              </div>

              <button
                onClick={generateMealPlan}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Generate My 7-Day Meal Plan
              </button>
            </div>
          </div>

          {hasMealPlan && (
            <div className="text-left">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Weekly Meal Plan</h3>
              
              <div className="grid lg:grid-cols-2 gap-6 mb-12">
                {mealPlan.map((recipe, index) => {
                  const isExpanded = expandedCards[index] || false;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 cursor-pointer select-none"
                        onClick={() => toggleCardExpansion(index)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-white font-bold text-lg">{days[index]}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="bg-white/20 px-2 py-1 rounded-full text-xs text-white">
                              {recipe.cuisine}
                            </span>
                            <div className="bg-white/20 hover:bg-white/30 p-1 rounded-full transition-colors">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-white" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                        <h5 className="text-white text-xl font-semibold mb-2">{recipe.name}</h5>
                        <div className="flex justify-between items-center text-white/90 text-sm">
                          <span>Serves {recipe.servings}</span>
                          <span>{recipe.calories_per_serving} cal/serving</span>
                        </div>
                      </div>
                      
                      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6">
                          <div className="mb-4">
                            <h6 className="font-semibold text-gray-700 mb-2">Ingredients:</h6>
                            <div className="flex flex-wrap gap-2">
                              {recipe.ingredients.map((ingredient, idx) => (
                                <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h6 className="font-semibold text-gray-700 mb-2">Instructions:</h6>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {recipe.instructions}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {!isExpanded && (
                        <div className="p-3 border-t border-gray-100 bg-gray-50">
                          <p className="text-gray-500 text-xs text-center flex items-center justify-center">
                            Click anywhere on the card to view ingredients and instructions
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 mr-3 text-green-600" />
                  Shopping List
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(shoppingList)
                    .filter(([category, items]) => items.length > 0)
                    .map(([category, items]) => (
                      <div key={category} className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-800 mb-3 capitalize">{category}</h5>
                        <ul className="space-y-2">
                          {items.map((item, idx) => (
                            <li key={idx} className="flex justify-between items-center text-sm">
                              <span className="capitalize">{item.name}</span>
                              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                {item.quantity} {item.unit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
