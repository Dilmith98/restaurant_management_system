import 'package:flutter/cupertino.dart';

import '../../../../common_widgets/background_image.dart';

class CustomerCart extends StatelessWidget {
  const CustomerCart({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: const <Widget>[
        BackgroundImage(),
      ],
    );
  }
}
