import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ProfileCard from './ProfileCard';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import get from 'lodash/get';
import times from 'lodash/times';
import { SkeletonLoader } from 'src/components';
import { RadioButton, Text } from 'react-native-paper';

type IProp = {
  data: any[];
  selectedData: any;
  loading?: boolean;
};

const ProfileList = (prop: IProp) => {
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

  return (
    <>
      <RadioButton.Group
        onValueChange={newValue => console.log('new Value', newValue)}
        value={'1'}>
        <FlatList
          data={Object(prop.loading ? times(10) : prop.data)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <>
              {prop.loading ? (
                <SkeletonLoader height={60} />
              ) : (
                <ProfileCard
                  dataItem={item}
                  selected={true}
                  handleRowClick={toggleRowSelection}
                />
              )}
            </>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </RadioButton.Group>
    </>
  );
};

export default ProfileList;
