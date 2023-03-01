import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../../common_widgets/background_image.dart';
import '../../../../common_widgets/drawer_item_appbar.dart';

class HelpCenterScreen extends StatelessWidget {
  const HelpCenterScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: const DrawerItemAppbar(title: "Help Center"),
        body: Stack(
          children: const <Widget>[
            BackgroundImage(),
          ],
        ),
      ),
    );
  }
}
