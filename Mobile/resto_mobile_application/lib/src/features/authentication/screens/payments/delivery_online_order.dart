import 'dart:convert';

import 'package:awesome_dialog/awesome_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../../common_widgets/background_image.dart';
import '../../../../constants/image_strings.dart';

enum SingingCharacter { cashOn, card }

class DeliveryOnlineOrder extends StatefulWidget {
  const DeliveryOnlineOrder({Key? key}) : super(key: key);

  @override
  State<DeliveryOnlineOrder> createState() => _DeliveryOnlineOrderState();
}

class _DeliveryOnlineOrderState extends State<DeliveryOnlineOrder> {
  //For Get User Input
  var nameController = TextEditingController();
  var emailController = TextEditingController();
  var contactController = TextEditingController();
  var addressController = TextEditingController();

  //For Radio Button
  SingingCharacter? _method = SingingCharacter.cashOn;

  //For Initially Load the user details
  late Future<Map<String, dynamic>> _futureData;
  @override
  void initState() {
    super.initState();
    _futureData = getUserDetails();
  }


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF161b1d),
        appBar: AppBar(
          foregroundColor: const Color(0xFFfebf10),
          elevation: 0,
          leading: IconButton(
            onPressed: () {
              // Navigator.of(context).push(
              //   MaterialPageRoute(
              //     builder: (_){
              //       return const ProductMenuTitles();
              //     },
              //   ),
              // );
            },
            icon: const Icon(Icons.chevron_left),
          ),
          title: const Text('Your Cart'),
          backgroundColor: const Color(0xFF161b1d),
          centerTitle: true,
        ),
        body: Stack(
          children: [
            const BackgroundImage(),
            Column(
              children: [
                Expanded(
                  child: Center(
                    child: FutureBuilder(
                      future: _futureData,
                      builder: (context, snapshot) {
                        if(snapshot.hasData){
                          final String userName = snapshot.data!['user']['Name'];
                          final String userEmail = snapshot.data!['user']['Email'];
                          final String userContact = snapshot.data!['user']['ContactNumber'];
                          final String userAddress = snapshot.data!['user']['Address'];
                          return Column(
                            children: [
                              Expanded(
                                child: Center(
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: TextFormField(
                                      controller: nameController,
                                      initialValue: userName,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                        fontWeight: FontWeight.bold,
                                      ),
                                      decoration: InputDecoration(
                                        labelText: 'Delivery To',
                                        labelStyle: const TextStyle(
                                          fontSize: 15,
                                          color: Color(0xFFfebf10),
                                        ),
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                        ),
                                        suffixIcon: const Icon(
                                          Icons.person,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Center(
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: TextFormField(
                                      controller: emailController,
                                      initialValue: userEmail,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                        fontWeight: FontWeight.bold,
                                      ),
                                      decoration: InputDecoration(
                                        labelText: 'Email',
                                        labelStyle: const TextStyle(
                                          fontSize: 15,
                                          color: Color(0xFFfebf10),
                                        ),
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                        ),
                                        suffixIcon: const Icon(
                                          Icons.email,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Center(
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: TextFormField(
                                      controller: contactController,
                                      initialValue: userContact,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                        fontWeight: FontWeight.bold,
                                      ),
                                      decoration: InputDecoration(
                                        labelText: 'Contact Number',
                                        labelStyle: const TextStyle(
                                          fontSize: 15,
                                          color: Color(0xFFfebf10),
                                        ),
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                        ),
                                        suffixIcon: const Icon(
                                          Icons.phone_android,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Center(
                                  child: Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: TextFormField(
                                      controller: addressController,
                                      initialValue: userAddress,
                                      style: const TextStyle(
                                        fontSize: 15,
                                        color: Color(0xFFfebf10),
                                        fontWeight: FontWeight.bold,
                                      ),
                                      decoration: InputDecoration(
                                        labelText: 'Address',
                                        labelStyle: const TextStyle(
                                          fontSize: 15,
                                          color: Color(0xFFfebf10),
                                        ),
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFfebf10)),
                                        ),
                                        focusedBorder: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(10),
                                          borderSide: const BorderSide(color: Color(0xFFFFFF33)),
                                        ),
                                        suffixIcon: const Icon(
                                          Icons.location_on_outlined,
                                          color: Color(0xFFfebf10),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          );
                        }else if (snapshot.hasError) {
                          return Text('${snapshot.error}');
                        }
                        return const CircularProgressIndicator();
                      }
                    ),
                  ),
                ),
                Expanded(
                  child: Center(
                    child: Column(
                      children: [
                        Expanded(
                          child: Center(
                            child: Container(
                              width: 150,
                              height: 35,
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: AnimatedButton(
                                text: "Update Details",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  updateUserDetails();
                                  Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (_) {
                                        return const DeliveryOnlineOrder();
                                      },
                                    ),
                                  );
                                },
                                borderRadius: const BorderRadius.only(
                                  topLeft: Radius.circular(0),
                                  topRight: Radius.circular(80),
                                  bottomLeft: Radius.circular(80),
                                  bottomRight: Radius.circular(80),
                                ),
                              ),
                            ),
                          ),
                        ),
                        const Divider(
                          color: Color(0xFFfebf10),
                        ),
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: const [
                                Text(
                                  'Select Payment Method:',
                                  style: TextStyle(
                                    fontSize: 20,
                                    color: Colors.white,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        Expanded(
                          child: ListTile(
                            title: const Text(
                              'Cash On Delivery',
                              style: TextStyle(
                                fontSize: 18,
                                color: Color(0xFFfebf10),
                              ),
                            ),
                            leading: Radio<SingingCharacter>(
                              value: SingingCharacter.cashOn,
                              groupValue: _method,
                              onChanged: (SingingCharacter? value) {
                                setState(() {
                                  _method = value;
                                });
                              },
                            ),
                          ),
                        ),
                        Expanded(
                          child: ListTile(
                            title: const Text(
                              'Card Payment',
                              style: TextStyle(
                                fontSize: 18,
                                color: Color(0xFFfebf10),
                              ),
                            ),
                            leading: Radio<SingingCharacter>(
                              value: SingingCharacter.card,
                              groupValue: _method,
                              onChanged: (SingingCharacter? value) {
                                setState(() {
                                  _method = value;
                                });
                              },
                            ),
                          ),
                        ),
                        const Divider(
                          color: Color(0xFFfebf10),
                        ),
                        Expanded(
                          child: Center(
                            child: Container(
                              width: 150,
                              height: 35,
                              padding: const EdgeInsets.only(left: 5, right: 5),
                              child: AnimatedButton(
                                text: "Save Details",
                                buttonTextStyle: const TextStyle(
                                  color: Colors.black,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                                color: const Color(0xFFfebf10),
                                pressEvent: () {
                                  print(_method);
                                },
                                borderRadius: const BorderRadius.only(
                                  topLeft: Radius.circular(0),
                                  topRight: Radius.circular(80),
                                  bottomLeft: Radius.circular(80),
                                  bottomRight: Radius.circular(80),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
  Future<Map<String, dynamic>> getUserDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userToken = pref.getString("JwtToken");
    print("In the getUserDetails() ${userToken!}");
    final response = await http.get(
      Uri.parse('http://$hostName:5000/api/v1/Auth/Profile'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load data');
    }
  }

  void updateUserDetails() async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? userEmail = pref.getString("LoginEmail");
    String? userToken = pref.getString("JwtToken");
    var response = await http.patch(
      Uri.parse("http://$hostName:5000/api/v1/User/Profile/$userEmail"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        "Authorization": "Bearer $userToken",
      },
      body: jsonEncode(<String, dynamic>{
        "Name": nameController.text,
        "Email": emailController.text,
        "ContactNumber": contactController.text,
        "Address": addressController.text
      }),
    );
    if(response.statusCode == 201) {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      //successAwesomeDialog(DialogType.success, msg, "Success");
      print(msg);
    } else {
      final json = jsonDecode(response.body);
      final msg = json["message"];
      //unSuccessAwesomeDialog(DialogType.warning, msg, "Warning");
      print(msg);
    }
  }
}
