import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import {
  immutableConcat,
  immutablePush,
  immutableRemove,
  immutableMerge,
  immutableMergeMany,
  immutableUpdateObjectByKey
} from '../src';

describe('utils/helpers', () => {

  describe('utils/immutableConcat', () => {
      let stateArrayOfObjects = [
        { id: 1, name: 'David Bowie'},
        { id: 2, name: 'Prince'}
      ];

      let newStateArrayOfObjects = [
        { id: 3, name: 'Leonard Cohen'},
        { id: 4, name: 'Lemmy'}
      ];

      deepFreeze(stateArrayOfObjects);
      deepFreeze(newStateArrayOfObjects);

      const finalArrayOfObjects = [
        { id: 1, name: 'David Bowie'},
        { id: 2, name: 'Prince'},
        { id: 3, name: 'Leonard Cohen'},
        { id: 4, name: 'Lemmy'}
      ];

      it('concats one array of objects to another without affecting exisiting arrays', () => {
        expect(immutableConcat(stateArrayOfObjects, newStateArrayOfObjects)).to.eql(finalArrayOfObjects);
        expect(stateArrayOfObjects).to.eql([
          { id: 1, name: 'David Bowie'},
          { id: 2, name: 'Prince'}
        ]);
        expect(newStateArrayOfObjects).to.eql([
          { id: 3, name: 'Leonard Cohen'},
          { id: 4, name: 'Lemmy'}
        ]);
      });
  });

  describe('utils/immutablePush', () => {
      let stateArrayOfObjects = [
        { id: 1, name: 'David Bowie'},
        { id: 2, name: 'Prince'}
      ];

      let newStatefObjects = { id: 3, name: 'Leonard Cohen'};

      deepFreeze(stateArrayOfObjects);
      deepFreeze(newStatefObjects);

      const finalArrayOfObjects = [
        { id: 1, name: 'David Bowie'},
        { id: 2, name: 'Prince'},
        { id: 3, name: 'Leonard Cohen'}
      ];

      let simpleArray = ['David Bowie', 'Prince'];

      let newSimpleValue = 'Leonard Cohen';

      deepFreeze(simpleArray);

      const finalArray = ['David Bowie', 'Prince', 'Leonard Cohen'];

      it('immutably pushes another value into an array', () => {
        expect(immutablePush(stateArrayOfObjects, newStatefObjects)).to.eql(finalArrayOfObjects);
        expect(stateArrayOfObjects).to.eql([
          { id: 1, name: 'David Bowie'},
          { id: 2, name: 'Prince'}
        ]);
        expect(newStatefObjects).to.eql({ id: 3, name: 'Leonard Cohen'});
      });

      it('immutably pushes another simple value into an array', () => {
        expect(immutablePush(simpleArray, newSimpleValue)).to.eql(finalArray);
        expect(simpleArray).to.eql(['David Bowie', 'Prince']);
      });
  });

  describe('utils/immutableRemove', () => {
      let stateArrayOfObjects = [
        { id: 1, name: 'David Bowie'},
        { id: 2, name: 'Prince'},
        { id: 3, name: 'Leonard Cohen'},
        { id: 4, name: 'Lemmy'}
      ];

      deepFreeze(stateArrayOfObjects);

      const finalArrayOfObjects = [
        { id: 1, name: 'David Bowie'},
        { id: 3, name: 'Leonard Cohen'},
        { id: 4, name: 'Lemmy'}
      ];

      let simpleArray = ['David Bowie', 'Prince', 'Leonard Cohen', 'Lemmy'];

      deepFreeze(simpleArray);

      const finalArray = ['Prince', 'Leonard Cohen', 'Lemmy'];

      it('immutably removes a value from the array', () => {
        expect(immutableRemove(stateArrayOfObjects, 1)).to.eql(finalArrayOfObjects);
        expect(stateArrayOfObjects).to.eql([
          { id: 1, name: 'David Bowie'},
          { id: 2, name: 'Prince'},
          { id: 3, name: 'Leonard Cohen'},
          { id: 4, name: 'Lemmy'}
        ]);
      });

      it('immutably removes a simple value from the array', () => {
        expect(immutableRemove(simpleArray, 0)).to.eql(finalArray);
        expect(simpleArray).to.eql(['David Bowie', 'Prince', 'Leonard Cohen', 'Lemmy']);
      });
  });

  describe('utils/immutableMerge', () => {
      let stateObject = {
        id: 1,
        name: 'David Bowie'
      };

      let newStateObject = {
        name: 'Leonard Cohen',
        alias: 'David Bowie'
      };

      let thirdStateObject = {
        id: 2
      };

      deepFreeze(stateObject);
      deepFreeze(newStateObject);
      deepFreeze(thirdStateObject);

      const finalObject = {
        id: 1,
        name: 'Leonard Cohen',
        alias: 'David Bowie'
      };

      const secondFinalObject = {
        id: 2,
        name: 'Leonard Cohen',
        alias: 'David Bowie'
      };

      it('immutably merges one object with another', () => {
        expect(immutableMerge(stateObject, newStateObject)).to.eql(finalObject);
        expect(stateObject).to.eql({
          id: 1,
          name: 'David Bowie'
        });
      });
  });

  describe('utils/immutableMergeMany', () => {
      let stateObject = {
        id: 1,
        name: 'David Bowie'
      };

      let newStateObject = {
        name: 'Leonard Cohen',
        alias: 'David Bowie'
      };

      let thirdStateObject = {
        id: 2,
        name: 'Leonard Cohen',
        age: 80
      };

      deepFreeze(stateObject);
      deepFreeze(newStateObject);
      deepFreeze(thirdStateObject);

      const finalObject = {
        id: 2,
        name: 'Leonard Cohen',
        alias: 'David Bowie',
        age: 80
      };

      it('immutably merges 3 objects with each other', () => {
        expect(immutableMergeMany([stateObject, newStateObject, thirdStateObject])).to.eql(finalObject);

        expect(stateObject).to.eql({
          id: 1,
          name: 'David Bowie'
        });
        expect(newStateObject).to.eql({
          name: 'Leonard Cohen',
          alias: 'David Bowie'
        });
        expect(thirdStateObject).to.eql({
          id: 2,
          name: 'Leonard Cohen',
          age: 80
        });
      });
  });


  describe('utils/immutableUpdateObjectByKey', () => {
    let stateArrayOfObjects = [
      { id: 1, name: 'David Bowie'},
      { id: 2, name: 'Prince'},
      { id: 3, name: 'Leonard Cohen'},
      { id: 4, name: 'Lemmy'}
    ];

    let newStateObject = { id: 3, name: 'Indiana'};
    let anotherNewStateObject = { id: 3, name: 'Leonard Cohen', alias: 'David Bowie' };

    deepFreeze(stateArrayOfObjects);
    deepFreeze(newStateObject);

    const finalArrayOfObjects = [
      { id: 1, name: 'David Bowie'},
      { id: 2, name: 'Prince'},
      { id: 3, name: 'Indiana'},
      { id: 4, name: 'Lemmy'}
    ];

    const anotherFinalArrayOfObjects = [
      { id: 1, name: 'David Bowie'},
      { id: 2, name: 'Prince'},
      { id: 3, name: 'Leonard Cohen', alias: 'David Bowie' },
      { id: 4, name: 'Lemmy'}
    ];

    it('immutably updates and object in an array based on id', () => {
      expect(immutableUpdateObjectByKey(stateArrayOfObjects, newStateObject)).to.eql(finalArrayOfObjects);
      expect(stateArrayOfObjects).to.eql([
        { id: 1, name: 'David Bowie'},
        { id: 2, name: 'Prince'},
        { id: 3, name: 'Leonard Cohen'},
        { id: 4, name: 'Lemmy'}
      ]);
    });

    it('immutably updates and object in an array based on key passed in', () => {
      expect(immutableUpdateObjectByKey(stateArrayOfObjects, anotherNewStateObject, 'name')).to.eql(anotherFinalArrayOfObjects);
      expect(stateArrayOfObjects).to.eql([
        { id: 1, name: 'David Bowie'},
        { id: 2, name: 'Prince'},
        { id: 3, name: 'Leonard Cohen'},
        { id: 4, name: 'Lemmy'}
      ]);
    });
  });
});
