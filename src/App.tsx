<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kitchen Planner - Recipe Finder & Meal Planner</title>
  
  <!-- Favicon with chef's hat -->
  <link rel="icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWE1ODBjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTYgMTMuODdBNCA0IDAgMCAxIDcuNDEgNmE1LjExIDUuMTEgMCAwIDEgMS4wNS0xLjU0IDUgNSAwIDAgMSA3LjA4IDBBNS4xMSA1LjExIDAgMCAxIDE2LjU5IDYgNCA0IDAgMCAxIDE4IDEzLjg3VjIxSDZaIi8+PGxpbmUgeDE9IjYiIHkxPSIxNyIgeDI9IjE4IiB5Mj0iMTciLz48L3N2Zz4=">
  
  <!-- PWA Meta Tags -->
  <meta name="theme-color" content="#ea580c">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Kitchen Planner">
  <meta name="description" content="Find recipes from your ingredients and create weekly meal plans with shopping lists">
  
  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj48cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgZmlsbD0iI2VhNTgwYyIgcng9IjQwIi8+PHBhdGggZD0iTTQ4IDExMC45NkEzMiAzMiAwIDAgMSA1OS4yOCA0OGE0MC44OCA0MC44OCAwIDAgMSA4LjQtMTIuMzIgNDAgNDAgMCAwIDEgNTYuNjQgMCA0MC44OCA0MC44OCAwIDAgMSA4LjQgMTIuMzJBMzIgMzIgMCAwIDEgMTQ0IDExMC45NlYxNjhINDhaIiBmaWxsPSJ3aGl0ZSIvPjxsaW5lIHgxPSI0OCIgeTE9IjEzNiIgeDI9IjE0NCIgeTI9IjEzNiIgc3Ryb2tlPSIjZWE1ODBjIiBzdHJva2Utd2lkdGg9IjgiLz48L3N2Zz4=">
  
  <link rel="manifest" id="manifest-placeholder">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <div id="root"></div>
  
  <script>
    // Create and register manifest
    const manifest = {
      name: "Kitchen Planner",
      short_name: "Kitchen Planner",
      description: "Find recipes and create meal plans",
      start_url: "./",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ea580c",
      icons: [
        {
          src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj48cmVjdCB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgZmlsbD0iI2VhNTgwYyIgcng9IjQwIi8+PHBhdGggZD0iTTQ4IDExMC45NkEzMiAzMiAwIDAgMSA1OS4yOCA0OGE0MC44OCA0MC44OCAwIDAgMSA4LjQtMTIuMzIgNDAgNDAgMCAwIDEgNTYuNjQgMCA0MC44OCA0MC44OCAwIDAgMSA4LjQgMTIuMzJBMzIgMzIgMCAwIDEgMTQ0IDExMC45NlYxNjhINDhaIiBmaWxsPSJ3aGl0ZSIvPjxsaW5lIHgxPSI0OCIgeTE9IjEzNiIgeDI9IjE0NCIgeTI9IjEzNiIgc3Ryb2tlPSIjZWE1ODBjIiBzdHJva2Utd2lkdGg9IjgiLz48L3N2Zz4=",
          sizes: "192x192",
          type: "image/svg+xml"
        },
        {
          src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0iI2VhNTgwYyIgcng9IjEwMCIvPjxwYXRoIGQ9Ik0xMjggMjk1LjhBODUuMzMgODUuMzMgMCAwIDEgMTU4LjEgMTI4YTEwOS4wMSAxMDkuMDEgMCAwIDEgMjIuNC0zMi44NSAxMDYuNjcgMTA2LjY3IDAgMCAxIDE1MS4wNiAwIDEwOS4wMSAxMDkuMDEgMCAwIDEgMjIuNCAzMi44NUE4NS4zMyA4NS4zMyAwIDAgMSAzODQgMjk1LjhWNDQ4SDEyOFoiIGZpbGw9IndoaXRlIi8+PGxpbmUgeDE9IjEyOCIgeTE9IjM2MyIgeDI9IjM4NCIgeTI9IjM2MyIgc3Ryb2tlPSIjZWE1ODBjIiBzdHJva2Utd2lkdGg9IjIwIi8+PC9zdmc+",
          sizes: "512x512",
          type: "image/svg+xml"
        }
      ]
    };

    const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(manifestBlob);
    document.getElementById('manifest-placeholder').setAttribute('href', manifestURL);

    // Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swCode = `
          const CACHE_NAME = 'kitchen-planner-v1';
          
          self.addEventListener('install', (event) => {
            event.waitUntil(
              caches.open(CACHE_NAME).then((cache) => {
                return cache.addAll(['./', './index.html']);
              })
            );
          });
          
          self.addEventListener('fetch', (event) => {
            event.respondWith(
              caches.match(event.request).then((response) => {
                return response || fetch(event.request);
              })
            );
          });
        `;
        
        const swBlob = new Blob([swCode], { type: 'application/javascript' });
        const swURL = URL.createObjectURL(swBlob);
        
        navigator.serviceWorker.register(swURL)
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.log('Service Worker registration failed:', error);
          });
      });
    }
  </script>
  
  <script type="text/babel">
    const { useState, useEffect } = React;
    const { Search, ChefHat, Globe, Sparkles, Calendar, ShoppingCart, ChevronDown, ChevronUp, X, Download } = lucide;

    const RecipeFinderApp = () => {
      // Recipe Finder State
      const [ingredients, setIngredients] = useState('');
      const [selectedCuisine, setSelectedCuisine] = useState('all');
      const [searchResults, setSearchResults] = useState([]);
      const [hasSearched, setHasSearched] = useState(false);
      
      // Meal Planner State
      const [activeTab, setActiveTab] = useState('finder');
      const [selectedContinents, setSelectedContinents] = useState([]);
      const [dietaryPreference, setDietaryPreference] = useState('omnivore');
      const [mealPlan, setMealPlan] = useState([]);
      const [shoppingList, setShoppingList] = useState({});
      const [hasMealPlan, setHasMealPlan] = useState(false);
      const [expandedCards, setExpandedCards] = useState({});
      
      // PWA Install Prompt State
      const [showPWAPrompt, setShowPWAPrompt] = useState(false);
      const [deferredPrompt, setDeferredPrompt] = useState(null);
      const [canInstall, setCanInstall] = useState(false);

      // Check if user has interacted and show PWA prompt
      useEffect(() => {
        // Check if already dismissed or installed
        const pwaPromptDismissed = localStorage.getItem('pwaPromptDismissed');
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                           window.navigator.standalone === true;
        
        // Listen for beforeinstallprompt event
        const handleBeforeInstall = (e) => {
          e.preventDefault();
          setDeferredPrompt(e);
          setCanInstall(true);
          
          if (!pwaPromptDismissed && !isStandalone) {
            // Show prompt after user has had some interaction (3 seconds delay)
            setTimeout(() => {
              setShowPWAPrompt(true);
            }, 3000);
          }
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);
        
        // Check if already installed
        if (isStandalone) {
          console.log('App is running as PWA');
        }
        
        return () => {
          window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
      }, []);

      const handleInstallPWA = async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to the install prompt: ${outcome}`);
          
          if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
            setDeferredPrompt(null);
            setCanInstall(false);
          }
        } else {
          // Fallback for browsers that don't support beforeinstallprompt
          alert('To install this app:\n\n• On iOS: Tap the Share button and select "Add to Home Screen"\n• On Android: Tap the menu and select "Install App" or "Add to Home Screen"');
        }
        setShowPWAPrompt(false);
        localStorage.setItem('pwaPromptDismissed', 'true');
      };

      const dismissPWAPrompt = () => {
        setShowPWAPrompt(false);
        localStorage.setItem('pwaPromptDismissed', 'true');
      };

      // Enhanced recipe database with quantities, servings, and calories
      const recipeDatabase = [
        // ASIAN CUISINE
        { 
          name: "Chicken Fried Rice", 
          cuisine: "Chinese", 
          continent: "Asia", 
          ingredients: [
            { name: "rice", quantity: 200, unit: "g" },
            { name: "chicken breast", quantity: 300, unit: "g" },
            { name: "eggs", quantity: 2, unit: "pieces" },
            { name: "soy sauce", quantity: 30, unit: "mL" },
            { name: "mixed vegetables", quantity: 150, unit: "g" }
          ], 
          instructions: "Stir-fry rice with chicken, scrambled eggs, and vegetables. Season with soy sauce and serve hot.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 385
        },
        { 
          name: "Pad Thai", 
          cuisine: "Thai", 
          continent: "Asia", 
          ingredients: [
            { name: "rice noodles", quantity: 250, unit: "g" },
            { name: "shrimp", quantity: 200, unit: "g" },
            { name: "eggs", quantity: 2, unit: "pieces" },
            { name: "bean sprouts", quantity: 100, unit: "g" },
            { name: "lime", quantity: 2, unit: "pieces" }
          ], 
          instructions: "Stir-fry rice noodles with shrimp, eggs, and bean sprouts. Finish with lime juice and serve.", 
          type: "seafood",
          servings: 4,
          calories_per_serving: 425
        },
        { 
          name: "Vegetable Stir Fry", 
          cuisine: "Chinese", 
          continent: "Asia", 
          ingredients: [
            { name: "broccoli", quantity: 200, unit: "g" },
            { name: "carrots", quantity: 150, unit: "g" },
            { name: "bell peppers", quantity: 150, unit: "g" },
            { name: "soy sauce", quantity: 25, unit: "mL" },
            { name: "garlic", quantity: 3, unit: "cloves" }
          ], 
          instructions: "Stir-fry mixed vegetables with garlic and soy sauce. Serve over rice.", 
          type: "vegan",
          servings: 4,
          calories_per_serving: 145
        },
        { 
          name: "Tom Yum Soup", 
          cuisine: "Thai", 
          continent: "Asia", 
          ingredients: [
            { name: "shrimp", quantity: 250, unit: "g" },
            { name: "mushrooms", quantity: 150, unit: "g" },
            { name: "lemongrass", quantity: 2, unit: "stalks" },
            { name: "lime leaves", quantity: 5, unit: "leaves" },
            { name: "chili", quantity: 2, unit: "pieces" }
          ], 
          instructions: "Simmer shrimp and mushrooms in spicy and sour broth with Thai herbs.", 
          type: "seafood",
          servings: 4,
          calories_per_serving: 165
        },
        { 
          name: "Beef Teriyaki", 
          cuisine: "Japanese", 
          continent: "Asia", 
          ingredients: [
            { name: "beef", quantity: 400, unit: "g" },
            { name: "teriyaki sauce", quantity: 60, unit: "mL" },
            { name: "rice", quantity: 200, unit: "g" },
            { name: "mixed vegetables", quantity: 200, unit: "g" },
            { name: "sesame seeds", quantity: 10, unit: "g" }
          ], 
          instructions: "Cook beef in teriyaki sauce and serve over rice with vegetables.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 485
        },
       
        // EUROPEAN CUISINE
        { 
          name: "Spaghetti Carbonara", 
          cuisine: "Italian", 
          continent: "Europe", 
          ingredients: [
            { name: "spaghetti", quantity: 400, unit: "g" },
            { name: "eggs", quantity: 4, unit: "pieces" },
            { name: "bacon", quantity: 150, unit: "g" },
            { name: "parmesan cheese", quantity: 80, unit: "g" },
            { name: "black pepper", quantity: 2, unit: "g" }
          ], 
          instructions: "Toss hot pasta with eggs, crispy bacon, and parmesan. Finish with black pepper.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 525
        },
        { 
          name: "Margherita Pizza", 
          cuisine: "Italian", 
          continent: "Europe", 
          ingredients: [
            { name: "pizza dough", quantity: 300, unit: "g" },
            { name: "tomato sauce", quantity: 100, unit: "mL" },
            { name: "mozzarella cheese", quantity: 200, unit: "g" },
            { name: "fresh basil", quantity: 20, unit: "g" },
            { name: "olive oil", quantity: 15, unit: "mL" }
          ], 
          instructions: "Top pizza dough with sauce, cheese, and basil. Bake until golden.", 
          type: "vegetarian",
          servings: 4,
          calories_per_serving: 285
        },
        { 
          name: "Beef Bourguignon", 
          cuisine: "French", 
          continent: "Europe", 
          ingredients: [
            { name: "beef chuck", quantity: 800, unit: "g" },
            { name: "red wine", quantity: 500, unit: "mL" },
            { name: "onions", quantity: 200, unit: "g" },
            { name: "carrots", quantity: 200, unit: "g" },
            { name: "mushrooms", quantity: 250, unit: "g" }
          ], 
          instructions: "Slowly braise beef in red wine with vegetables until tender.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 465
        },
        { 
          name: "Greek Salad", 
          cuisine: "Greek", 
          continent: "Europe", 
          ingredients: [
            { name: "tomatoes", quantity: 300, unit: "g" },
            { name: "cucumber", quantity: 200, unit: "g" },
            { name: "olives", quantity: 80, unit: "g" },
            { name: "feta cheese", quantity: 150, unit: "g" },
            { name: "olive oil", quantity: 30, unit: "mL" }
          ], 
          instructions: "Combine fresh vegetables with feta and dress with olive oil.", 
          type: "vegetarian",
          servings: 4,
          calories_per_serving: 195
        },
        { 
          name: "Paella", 
          cuisine: "Spanish", 
          continent: "Europe", 
          ingredients: [
            { name: "rice", quantity: 300, unit: "g" },
            { name: "mixed seafood", quantity: 400, unit: "g" },
            { name: "saffron", quantity: 1, unit: "g" },
            { name: "bell peppers", quantity: 150, unit: "g" },
            { name: "peas", quantity: 100, unit: "g" }
          ], 
          instructions: "Cook rice with seafood and saffron in a large pan.", 
          type: "seafood",
          servings: 4,
          calories_per_serving: 445
        },
     
        // NORTH AMERICAN CUISINE
        { 
          name: "BBQ Ribs", 
          cuisine: "American", 
          continent: "North America", 
          ingredients: [
            { name: "pork ribs", quantity: 1200, unit: "g" },
            { name: "bbq sauce", quantity: 150, unit: "mL" },
            { name: "brown sugar", quantity: 50, unit: "g" },
            { name: "paprika", quantity: 10, unit: "g" },
            { name: "garlic powder", quantity: 5, unit: "g" }
          ], 
          instructions: "Rub ribs with spices and slow-cook. Glaze with BBQ sauce and finish on grill.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 625
        },
        { 
          name: "Caesar Salad", 
          cuisine: "American", 
          continent: "North America", 
          ingredients: [
            { name: "romaine lettuce", quantity: 300, unit: "g" },
            { name: "parmesan cheese", quantity: 50, unit: "g" },
            { name: "croutons", quantity: 80, unit: "g" },
            { name: "caesar dressing", quantity: 60, unit: "mL" },
            { name: "anchovies", quantity: 30, unit: "g" }
          ], 
          instructions: "Toss crisp romaine with dressing, cheese, and croutons.", 
          type: "vegetarian",
          servings: 4,
          calories_per_serving: 185
        },
        { 
          name: "Fish Tacos", 
          cuisine: "Mexican", 
          continent: "North America", 
          ingredients: [
            { name: "white fish fillets", quantity: 400, unit: "g" },
            { name: "corn tortillas", quantity: 8, unit: "pieces" },
            { name: "cabbage", quantity: 150, unit: "g" },
            { name: "lime", quantity: 2, unit: "pieces" },
            { name: "cilantro", quantity: 30, unit: "g" }
          ], 
          instructions: "Grill fish and serve in tortillas with fresh toppings.", 
          type: "seafood",
          servings: 4,
          calories_per_serving: 285
        },
        { 
          name: "Vegetarian Chili", 
          cuisine: "American", 
          continent: "North America", 
          ingredients: [
            { name: "mixed beans", quantity: 400, unit: "g" },
            { name: "diced tomatoes", quantity: 400, unit: "g" },
            { name: "onions", quantity: 150, unit: "g" },
            { name: "bell peppers", quantity: 150, unit: "g" },
            { name: "chili spices", quantity: 15, unit: "g" }
          ], 
          instructions: "Simmer beans and vegetables with spices for hearty chili.", 
          type: "vegan",
          servings: 4,
          calories_per_serving: 225
        },
      
        // SOUTH AMERICAN CUISINE
        { 
          name: "Chimichurri Steak", 
          cuisine: "Argentinian", 
          continent: "South America", 
          ingredients: [
            { name: "beef steak", quantity: 600, unit: "g" },
            { name: "fresh parsley", quantity: 60, unit: "g" },
            { name: "oregano", quantity: 10, unit: "g" },
            { name: "garlic", quantity: 4, unit: "cloves" },
            { name: "red wine vinegar", quantity: 30, unit: "mL" }
          ], 
          instructions: "Grill steak to desired doneness. Top with fresh chimichurri herb sauce.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 385
        },
        { 
          name: "Pisco Sour", 
          cuisine: "Peruvian", 
          continent: "South America", 
          ingredients: [
            { name: "pisco", quantity: 200, unit: "mL" },
            { name: "lime juice", quantity: 60, unit: "mL" },
            { name: "simple syrup", quantity: 30, unit: "mL" },
            { name: "egg white", quantity: 1, unit: "piece" },
            { name: "bitters", quantity: 2, unit: "mL" }
          ], 
          instructions: "Shake pisco with lime juice, syrup, and egg white. Strain and garnish with bitters.", 
          type: "vegetarian",
          servings: 4,
          calories_per_serving: 165
        },
        { 
          name: "Açaí Bowl", 
          cuisine: "Brazilian", 
          continent: "South America", 
          ingredients: [
            { name: "açaí puree", quantity: 100, unit: "g" },
            { name: "banana", quantity: 150, unit: "g" },
            { name: "granola", quantity: 50, unit: "g" },
            { name: "maple syrup", quantity: 20, unit: "mL" },
            { name: "mixed berries", quantity: 100, unit: "g" }
          ], 
          instructions: "Blend açaí with banana. Top with granola, maple syrup, and fresh berries.", 
          type: "vegan",
          servings: 4,
          calories_per_serving: 245
        },
        { 
          name: "Ceviche", 
          cuisine: "Peruvian", 
          continent: "South America", 
          ingredients: [
            { name: "white fish", quantity: 500, unit: "g" },
            { name: "lime juice", quantity: 100, unit: "mL" },
            { name: "red onions", quantity: 100, unit: "g" },
            { name: "cilantro", quantity: 30, unit: "g" },
            { name: "aji peppers", quantity: 20, unit: "g" }
          ], 
          instructions: "Cure raw fish in lime juice with onions and herbs.", 
          type: "seafood",
          servings: 4,
          calories_per_serving: 145
        },
        { 
          name: "Black Bean Rice", 
          cuisine: "Brazilian", 
          continent: "South America", 
          ingredients: [
            { name: "black beans", quantity: 300, unit: "g" },
            { name: "rice", quantity: 200, unit: "g" },
            { name: "onions", quantity: 100, unit: "g" },
            { name: "garlic", quantity: 3, unit: "cloves" },
            { name: "cumin", quantity: 5, unit: "g" }
          ], 
          instructions: "Cook black beans with aromatics and serve over rice.", 
          type: "vegan",
          servings: 4,
          calories_per_serving: 285
        },
        
        // AFRICAN CUISINE
        { 
          name: "Tagine", 
          cuisine: "Moroccan", 
          continent: "Africa", 
          ingredients: [
            { name: "lamb shoulder", quantity: 800, unit: "g" },
            { name: "dried apricots", quantity: 150, unit: "g" },
            { name: "onions", quantity: 200, unit: "g" },
            { name: "cinnamon", quantity: 5, unit: "g" },
            { name: "almonds", quantity: 80, unit: "g" }
          ], 
          instructions: "Slow-cook lamb with dried fruit and spices in a traditional tagine pot.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 485
        },
        { 
          name: "Injera with Doro Wat", 
          cuisine: "Ethiopian", 
          continent: "Africa", 
          ingredients: [
            { name: "chicken", quantity: 800, unit: "g" },
            { name: "berbere spice", quantity: 30, unit: "g" },
            { name: "onions", quantity: 200, unit: "g" },
            { name: "eggs", quantity: 6, unit: "pieces" },
            { name: "injera bread", quantity: 6, unit: "pieces" }
          ], 
          instructions: "Simmer chicken in spicy berbere sauce with hard-boiled eggs. Serve with injera.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 525
        },
        { 
          name: "Couscous Salad", 
          cuisine: "Moroccan", 
          continent: "Africa", 
          ingredients: [
            { name: "couscous", quantity: 200, unit: "g" },
            { name: "mixed vegetables", quantity: 300, unit: "g" },
            { name: "fresh herbs", quantity: 50, unit: "g" },
            { name: "lemon juice", quantity: 40, unit: "mL" },
            { name: "olive oil", quantity: 30, unit: "mL" }
          ], 
          instructions: "Mix cooked couscous with fresh vegetables and herbs.", 
          type: "vegan",
          servings: 4,
          calories_per_serving: 225
        },
        
        // OCEANIAN CUISINE
        { 
          name: "Barramundi", 
          cuisine: "Australian", 
          continent: "Oceania", 
          ingredients: [
            { name: "barramundi fillets", quantity: 600, unit: "g" },
            { name: "lemon", quantity: 2, unit: "pieces" },
            { name: "fresh herbs", quantity: 30, unit: "g" },
            { name: "olive oil", quantity: 30, unit: "mL" },
            { name: "mixed vegetables", quantity: 400, unit: "g" }
          ], 
          instructions: "Preheat oven to 400°F. Season 4 barramundi fillets with salt, pepper, and fresh herbs (dill, parsley). Heat 2 tbsp olive oil in oven-safe skillet over medium-high heat. Sear fish skin-side down 4 min, flip 2 min. Transfer to oven 6-8 min until fish flakes easily. Roast mixed vegetables (asparagus, zucchini) with lemon slices 20 min. Serve with lemon wedges. Total time: 35 min.", 
          type: "seafood",
          servings: 4,
          calories_per_serving: 285
        },
        { 
          name: "Meat Pie", 
          cuisine: "Australian", 
          continent: "Oceania", 
          ingredients: [
            { name: "ground beef", quantity: 500, unit: "g" },
            { name: "pastry sheets", quantity: 4, unit: "pieces" },
            { name: "onions", quantity: 150, unit: "g" },
            { name: "beef stock", quantity: 300, unit: "mL" },
            { name: "peas", quantity: 100, unit: "g" }
          ], 
          instructions: "Preheat oven to 425°F. Brown 1 lb ground beef with 1 diced onion (8 min). Add 2 tbsp flour, cook 2 min. Slowly add 1.5 cups beef stock, simmer until thick (10 min). Add 1/2 cup peas, cool slightly. Line pie tins with pastry, fill with mixture, top with pastry. Brush with beaten egg. Bake 25-30 min until golden. Serve with tomato sauce. Total time: 1 hour 15 min.", 
          type: "meat",
          servings: 4,
          calories_per_serving: 425
        },
      ];

      const cuisines = Array.from(new Set(recipeDatabase.map(recipe => recipe.cuisine))).sort();
      
      // Continent mapping for meal planner
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
      const findMatchingRecipes = () => {
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
      const handleContinentToggle = (continentValue) => {
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
          
          // Dietary preference filtering
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

        const selectedRecipes = [];
        const usedRecipes = new Set();

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

      const toggleCardExpansion = (index) => {
        setExpandedCards(prev => ({
          ...prev,
          [index]: !prev[index]
        }));
      };

      const generateShoppingList = (recipes) => {
        const allIngredients = new Map();
        
        recipes.forEach(recipe => {
          recipe.ingredients.forEach((ingredient) => {
            const key = ingredient.name.toLowerCase();
            if (allIngredients.has(key)) {
              const existing = allIngredients.get(key);
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

        const categories = {
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

        const categorizedIngredients = {};
        
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

              {/* Search Interface */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
                <div className="space-y-6">
                  {/* Ingredients Input */}
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

                  {/* Cuisine Selection */}
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

                  {/* Search Button */}
                  <button
                    onClick={handleSearch}
                    disabled={!ingredients.trim()}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Find My Recipes
                  </button>
                </div>
              </div>

              {/* Results Section */}
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

              {/* Stats Section */}
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

              {/* Meal Planner Interface */}
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

                  {/* Generate Meal Plan Button */}
                  <button
                    onClick={generateMealPlan}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-8 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Generate My 7-Day Meal Plan
                  </button>
                </div>
              </div>

              {/* Meal Plan Results */}
              {hasMealPlan && (
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Weekly Meal Plan</h3>
                  
                  {/* Meal Plan Cards */}
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
                          
                          {/* Collapsible Content */}
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
                          
                          {/* Collapsed State Info */}
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

                  {/* Shopping List */}
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

    ReactDOM.render(<RecipeFinderApp />, document.getElementById('root'));
  </script>
  
  <style>
    @keyframes slide-up {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .animate-slide-up {
      animation: slide-up 0.3s ease-out;
    }
  </style>
</body>
</html>
