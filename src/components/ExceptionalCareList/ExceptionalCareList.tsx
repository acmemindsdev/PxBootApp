import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ListItem from './List_Item';
import includes from 'lodash/includes';
import filter from 'lodash/filter';

type IProp = {
  data: any[];
  selectedData: any;
};

const ExceptionalCareList = (prop: IProp) => {
  const [selectedRowItem, setSelectedRowItem] = useState(Array());

  /**
   * Handle Row Click Method and Toggle selection
   * @param data: Should be object
   */
  const toggleRowSelection = (data: any) => {
    //const existingValue = get(data, 'id', '')
    const exists = includes(selectedRowItem, data);
    if (exists)
      setSelectedRowItem(filter(selectedRowItem, value => data !== value));
    else {
      setSelectedRowItem([...selectedRowItem, data]);
    }
  };

  useEffect(() => {
    // Pass Selected list to parent component
    prop.selectedData(selectedRowItem);
  }, [selectedRowItem]);

  return (
    <FlatList
      data={Object(prop.data)}
      renderItem={({ item, index }) => (
        <ListItem
          dataItem={item}
          selected={includes(selectedRowItem, item)}
          handleRowClick={toggleRowSelection}
        />
      )}
      keyExtractor={(item, index) => item.id}
    />
  );
};

export default ExceptionalCareList;
