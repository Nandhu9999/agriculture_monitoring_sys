import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import ServiceItem from "../../../src/components/ServiceItem";

export default function ServicePage({}) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Service#${id || -1}`,
    });
  }, [navigation, id]);

  return <ServiceItem serviceId={id} />;
}
