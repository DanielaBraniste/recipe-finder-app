import React, { useState, useEffect } from 'react';
import { Search, ChefHat, Sparkles, Calendar, ShoppingCart, ChevronDown, ChevronUp, X, Download, Loader2 } from 'lucide-react';

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
  // Recipe Database State
  const [recipeDatabase, setRecipeDatabase] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
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
    const loadRecipes = async () => {
      try {
        const cached = localStorage.getItem('recipesCache');
        const cacheTimestamp = localStorage.getItem('recipesCacheTime');
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (cached && cacheTimestamp && (now - parseInt(cacheTimestamp)) < oneDay) {
          setRecipeDatabase(JSON.parse(cached));
          setIsLoadingRecipes(false);
          return;
        }

        const response = await fetch('/recipes.json');
        if (!response.ok) {
          throw new Error('Failed to load recipes');
        }
        
        const recipes = await response.json();
        setRecipeDatabase(recipes);
        
        localStorage.setItem('recipesCache', JSON.stringify(recipes));
        localStorage.setItem('recipesCacheTime', now.toString());
        
        setIsLoadingRecipes(false);
      } catch (error) {
        console.error('Error loading recipes:', error);
        setLoadError('Failed to load recipes. Please refresh the page.');
        setIsLoadingRecipes(false);
      }
    };

    loadRecipes();
  }, []);

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

  const submitToNetlify = (action: string, recipes: Recipe[]) => {
    const formData = new URLSearchParams();
    formData.append('form-name', 'recipe-search');
    formData.append('ingredients', ingredients);
    formData.append('action', action);
    formData.append('cuisine', selectedCuisine);
    formData.append('recipes-found', recipes.map(r => r.name).join(', '));
    formData.append('recipe-count', recipes.length.toString());

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    })
      .then(() => console.log('Form submitted to Netlify'))
      .catch(error => console.error('Form submission error:', error));
  };

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
    submitToNetlify('search', results);
  };

  const handleSurpriseMe = () => {
    setSelectedCuisine('surprise');
    setTimeout(() => {
      const results = findMatchingRecipes();
      setSearchResults(results);
      setHasSearched(true);
      submitToNetlify('surprise-me', results);
    }, 100);
  };

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

  if (isLoadingRecipes) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700 font-semibold">Loading recipes...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 mb-4">
            <X className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Hidden Netlify Form - Must match submission fields exactly */}
      <form name="recipe-search" netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="text" name="ingredients" />
        <input type="text" name="action" />
        <input type="text" name="cuisine" />
        <input type="text" name="recipes-found" />
        <input type="text" name="recipe-count" />
      </form>

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
          <a 
            href="https://buymeacoffee.com/tadamn" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <span className="text-lg">☕</span>
            <span>Donate</span>
          </a>
        </div>
      </div>

      {/* Rest of your JSX remains exactly the same... */}
      {/* (keeping all the existing tabs, recipe finder, and meal planner code) */}
    </div>
  );
};

export default App;
