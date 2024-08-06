"use client";
import React, { useState, useEffect } from 'react';
import { Text } from "@chakra-ui/react";

const LastUpdated: React.FC = () => {
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    setDateString(new Date().toLocaleString());
  }, []);

  return <Text color="gray.500">Last updated: {dateString}</Text>;
};

export default LastUpdated;