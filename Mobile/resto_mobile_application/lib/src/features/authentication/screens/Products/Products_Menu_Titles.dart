import 'package:flutter/material.dart';
import 'package:resto_mobile_application/src/common_widgets/Menu_Container.dart';
import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/menu_appbar.dart';
import '../Customer/customer_home.dart';
import '../Customer/customer_search.dart';

class ProductMenuTitles extends StatefulWidget {

  const ProductMenuTitles({Key? key}) : super(key: key);

  @override
  State<ProductMenuTitles> createState() => _ProductMenuTitlesState();
}

class _ProductMenuTitlesState extends State<ProductMenuTitles> {

  List<Map<String, String>> foodMenuItems = [
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Koththu",
    },
    {
      "ItemImagePath": "assets/Food Types/Rice/Veg_Rice.jpg",
      "ItemName": "Fried Rice",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Rice & Curry",
    },
    {
      "ItemImagePath": "assets/Food Types/Burger/Chicken_Burger.jpg",
      "ItemName": "Burger",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Appetizer",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Desert",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Beverages",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Salad",
    },
    {
      "ItemImagePath": "assets/Food Types/Koththu/Chicken_Koththu.jpg",
      "ItemName": "Other",
    },
  ];
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const MenuAppBar(),
        body: Stack(
          children: <Widget>[
            const BackgroundImage(),
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Expanded(
                child: GridView.builder(
                  itemCount: foodMenuItems.length,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 10.0,
                      mainAxisSpacing: 10.0
                  ),
                  itemBuilder: (BuildContext context, int index){
                    return MenuContainer(
                      ItemImagePath: foodMenuItems[index]["ItemImagePath"] ?? '',
                      ItemName: foodMenuItems[index]["ItemName"] ?? '',
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
