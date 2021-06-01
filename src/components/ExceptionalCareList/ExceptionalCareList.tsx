import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ListItem from './List_Item';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import get from 'lodash/get';
import times from 'lodash/times';
import { SkeletonLoader } from '..';

type IProp = {
  data: any[];
  selectedData: any;
  loading?: boolean;
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

  useEffect(() => {
    // Add Mapped exceptional cared data into selected item
    const mappedData = filter(prop.data, value =>
      get(value, 'ispatientmapped', false),
    );
    // merge array
    const mergeArray = selectedRowItem.concat(mappedData);
    setSelectedRowItem(mergeArray);
  }, [prop.data]);

  return (
    <>
      <FlatList
        data={Object(prop.loading ? times(10) : prop.data)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <>
            {prop.loading ? (
              <SkeletonLoader height={60} />
            ) : (
              <ListItem
                dataItem={item}
                selected={includes(selectedRowItem, item)}
                handleRowClick={toggleRowSelection}
              />
            )}
          </>
        )}
        keyExtractor={(item, index) => item.id}
      />
    </>
  );
};

export default ExceptionalCareList;
