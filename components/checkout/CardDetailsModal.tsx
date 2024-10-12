import { View, Modal, ScrollView, Keyboard, Alert } from "react-native";
import { useState } from "react";
import ModalHeader from "../modal/ModalHeader";
import CardInput from "../modal/CardInput";
import CustomButton from "../CustomButton";
import { baseURL, RootState } from "@/app/_layout";
import { useSelector } from "react-redux";
import { priceToNumber } from "../TotalTable";
import { number } from "yup";

interface CardDetailsModal {
  isVisible: boolean;
  dismissFunction: () => void;
  paymentMethod: string;
}

const CardDetailsModal = ({ isVisible, dismissFunction, paymentMethod }: CardDetailsModal) => {
  const user = useSelector((state: RootState) => state.user.value);
  const checkoutInfo = useSelector((state: RootState) => state.checkout.value);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCardNumber = (text: string) => {
    const maxLength = 19;
    const len = text.length;

    if (len <= maxLength) {
      text = (len + 1) % 5 === 0 && len !== maxLength && cardNumber.length < len ? text.concat(" ") : text;
      setCardNumber(text);
    } else {
      Keyboard.dismiss();
    }
  };

  const handleDate = (text: string, setter: (text: string) => void, setterValue: string) => {
    const maxLength = 5;
    const len = text.length;

    if (len <= maxLength) {
      text = len === 2 && setterValue.length < len ? text.concat("/") : text;
      setter(text);
    } else {
      Keyboard.dismiss();
    }
  };

  const processPayment = async () => {
    if (!paymentMethod) {
      Alert.alert("Null Payment gateway", "Please select a payment method");
    } else {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/charge`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            amount: priceToNumber(checkoutInfo.price),
            card: {
              number: cardNumber.replaceAll(" ", ""),
              cvv: cvv,
              expiry_month: expiryDate.split("/")[0],
              expiry_year: expiryDate.split("/")[1],
            },
          }),
        });
        const data = await res.json();
        console.log(data);
      } catch (error: any) {
        Alert.alert("Error processing payment", error.message);
      }
      setLoading(false);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-[80%] p-5 bg-white rounded-t-[30px]">
          <ModalHeader title="Enter Card Details" closeFunction={dismissFunction} />
          {/* card form */}
          <View className="mt-6">
            <CardInput labelText="Card Name" placeholderText="Enter your street" onChangeFunction={text => setCardName(text)} inputValue={cardName} />
            <CardInput
              labelText="Card Number"
              placeholderText="5365 3652 3659 2586"
              keyboardType="number-pad"
              onChangeFunction={text => handleCardNumber(text)}
              inputValue={cardNumber}
            />
            <View className="flex-row">
              <CardInput
                labelText="Expiry Date"
                placeholderText="12/26"
                keyboardType="number-pad"
                addStyles={{ flex: 1, marginRight: 12 }}
                onChangeFunction={text => handleDate(text, setExpiryDate, expiryDate)}
                inputValue={expiryDate}
              />
              <CardInput
                labelText="CVC/CVV"
                placeholderText="12/26"
                keyboardType="number-pad"
                addStyles={{ flex: 1 }}
                onChangeFunction={text => handleDate(text, setCvv, cvv)}
                inputValue={cvv}
              />
            </View>
          </View>

          {/* button */}
          <CustomButton text="Proceed" />
        </View>
      </ScrollView>
    </Modal>
  );
};
export default CardDetailsModal;
