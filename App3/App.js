import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, TextInput } from 'react-native';
import { useIsFocused, NavigationContainer, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const FavoritesContext = React.createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem('favorites');
      if (favoritesString !== null) {
        const favoritesData = JSON.parse(favoritesString);
        setFavorites(favoritesData);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const toggleFavorite = (cocktail) => {
    const isFavorite = favorites.some(favorite => favorite.idDrink === cocktail.idDrink);
    if (isFavorite) {
      const updatedFavorites = favorites.filter(favorite => favorite.idDrink !== cocktail.idDrink);
      setFavorites(updatedFavorites);
    } else {
      setFavorites(prevFavorites => [...prevFavorites, cocktail]);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

function HomeScreen() {
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useFavorites();
  const [cocktails, setCocktails] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchCocktails('Alcoholic');
    fetchCocktails('Non_Alcoholic');
  }, []);

  const fetchCocktails = async (type) => {
    try {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`);
      const data = await response.json();
      setCocktails(prevState => [...prevState, ...data.drinks]);
    } catch (error) {
      console.error(`Error fetching ${type} cocktails:`, error);
    }
  };

  const navigateToDetail = (cocktail) => {
    navigation.navigate('CocktailDetail', { cocktail });
  };

  const filteredCocktails = cocktails.filter(cocktail =>
    cocktail.strDrink.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetail(item)}>
      <View style={styles.card} key={item.idDrink}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={styles.image}
        />
        <View style={styles.cardView}>
          <Text style={styles.title}>{item.strDrink}</Text>
          <Text style={styles.title}>{item.strAlcoholic}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Icon name={favorites.some(favorite => favorite.idDrink === item.idDrink) ? 'heart' : 'heart-o'} size={20} color="#B0008B" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <Text style={styles.discover}>Découvrir</Text>
      <FlatList
        data={filteredCocktails}
        renderItem={renderItem}
        keyExtractor={item => item.idDrink}
      />
    </View>
  );
}

function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useFavorites();

  const navigateToDetail = (cocktail) => {
    navigation.navigate('CocktailDetail', { cocktail });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetail(item)}>
      <View style={styles.card} key={item.idDrink}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={styles.image}
        />
        <View style={styles.cardView}>
          <Text style={styles.title}>{item.strDrink}</Text>
          <Text style={styles.title}>{item.strAlcoholic}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Icon name={favorites.some(favorite => favorite.idDrink === item.idDrink) ? 'heart' : 'heart-o'} size={20} color="#B0008B" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.idDrink}
      />
    </View>
  );
}

function CocktailDetailScreen({ route }) {
  const { cocktail } = route.params;
  const [cocktailDetails, setCocktailDetails] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`);
        const data = await response.json();
        setCocktailDetails(data.drinks[0]);
      } catch (error) {
        console.error('Error fetching cocktail details:', error);
      }
    };

    fetchCocktailDetails();
  }, []);

  return (
    <View style={styles.container}>
      {cocktailDetails && (
        <>
          <Text style={styles.titlePage}>{cocktailDetails.strDrink}</Text>
          <Image
            source={{ uri: cocktailDetails.strDrinkThumb }}
            style={styles.image}
          />
          <Text style={styles.description}>Description: {cocktailDetails.strInstructions}</Text>
          <Text style={styles.ingredients}>Ingrédients: {cocktailDetails.strIngredient1}, {cocktailDetails.strIngredient2}, {cocktailDetails.strIngredient3}, ...</Text>
        </>
      )}
    </View>
  );
}

function CategoriesScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories(data.drinks);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const navigateToCategoryDetail = (category) => {
    navigation.navigate('CategoryDetail', { category });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToCategoryDetail(item.strCategory)}>
      <View style={styles.categoryItem}>
        <Text style={styles.categoryName}>{item.strCategory}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.strCategory}
      />
    </View>
  );
}

function CategoryDetailScreen({ route, navigation }) {
  const { category } = route.params;
  const { favorites, toggleFavorite } = useFavorites();
  const [categoryCocktails, setCategoryCocktails] = useState([]);

  useEffect(() => {
    const fetchCategoryCocktails = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setCategoryCocktails(data.drinks);
      } catch (error) {
        console.error('Error fetching category cocktails:', error);
      }
    };

    fetchCategoryCocktails();
  }, [category]);

  const navigateToDetail = (cocktail) => {
    navigation.navigate('CocktailDetail', { cocktail });
  };

  const renderCocktailItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetail(item)}>
      <View style={styles.card} key={item.idDrink}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={styles.image}
        />
        <View style={styles.cardView}>
          <Text style={styles.title}>{item.strDrink}</Text>
          <Text style={styles.title}>{item.strAlcoholic}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Icon name={favorites.some(favorite => favorite.idDrink === item.idDrink) ? 'heart' : 'heart-o'} size={20} color="#B0008B" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryCocktails}
        renderItem={renderCocktailItem}
        keyExtractor={item => item.idDrink}
      />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#41052E' },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <FavoritesProvider>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="CocktailDetail" component={CocktailDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </FavoritesProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  card: {
    backgroundColor: '#2F2F2F',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadowColor: '#B0008B',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titlePage: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
    color: '#fff',
    textShadowColor: '#B0008B',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: '#B0008B',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  discover: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: '#B0008B',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  moreButton: {
    color: '#B0008B',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 16,
    color: '#fff',
  },
  searchInput: {
    marginTop: 30,
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  categoryItem: {
    backgroundColor: '#2F2F2F',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#B0008B',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#B0008B',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default App;
