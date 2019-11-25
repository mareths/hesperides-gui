/**
 * This is for testing the properties-list 'hesperides.module.propertiesList'
 */
describe('Testing hesperides properties-list', function () {
    // create model properties mocks for the tests
    const firstModelMock = {
        'key_value_properties': [
            {
                'name': 'property_1', 'comment': '', 'required': false,
                'defaultValue': 'DEFAULT', 'pattern': '', 'password': true,
            },
            {
                'name': 'property_2', 'comment': null, 'required': false,
                'defaultValue': '45', 'pattern': '45', 'password': false,
            },
        ],
    };

    const secondModelMock = {
        'key_value_properties': [
            {
                'name': 'John', 'comment': '', 'required': true,
                'defaultValue': '31', 'pattern': '', 'password': false,
            },
            {
                'name': 'Doe', 'comment': null, 'required': false,
                'defaultValue': '', 'pattern': '', 'password': false,
            },
        ],
    };

    // create global properties mock for tests
    const globalPropertiesMock = {
        'key_value_properties': [
            {
                'name': 'property_2',
                'value': 'global_value',
                'filtrable_value': 'global_value',
            },
            {
                'name': 'foo',
                'value': 'foo_value',
                'filtrable_value': 'foo_value',
            },
        ],
    };

    // create properties mocks for the tests
    const firstPropertiesMock = {
        'key_value_properties': [
            {
                'name': 'property_1', 'value': 'foo',
            },
            {
                'name': 'property_2', 'value': 'bar',
            },
        ],
        'moduleName': 'Foo',
    };

    const secondPropertiesMock = {
        'key_value_properties': [
            {
                'name': 'property_1', 'value': '45',
            },
            {
                'name': 'property_3', 'value': '',
            },
            {
                'name': 'property_4', 'value': '42',
            },
        ],
        'moduleName': 'Bar',
    };

    const thirdPropertiesMock = {
        'key_value_properties': [
            {
                'name': 'property_1', 'value': 'foo', 'valuedByAGlobal': false,
            },
            {
                'name': 'property_2', 'value': 'bar', 'valuedByAGlobal': true,
            },
        ],
        'moduleName': 'Foo',
    };

    // load the module to be tested
    beforeEach(module('hesperides.module.propertiesList'));

    describe('Testing the isModelPropertiesAreModelOfGivenProperties', function () {
        let scope = null;
        let Properties = null;

        beforeEach(inject(function ($rootScope, $controller, _Properties_) {
            // new scope and test data
            scope = $rootScope.$new();
            $controller('PropertiesListController', { $scope: scope });
            Properties = _Properties_;
        }));

        it('should test if modelProperties is a model of given properties', function () {
            const properties = new Properties(angular.copy(firstPropertiesMock));
            const firstModelProperties = new Properties(angular.copy(firstModelMock));
            expect(scope.isModelPropertiesAreModelOfGivenProperties(firstModelProperties, properties)).toEqual(true);
            const secondModelProperties = new Properties(angular.copy(secondModelMock));
            expect(scope.isModelPropertiesAreModelOfGivenProperties(secondModelProperties, properties)).toEqual(false);
        });
    });

    describe('Testing initModulesWhereUsedAndNbUsageOfProperties', function () {
        let scope = null;
        let Properties = null;

        beforeEach(inject(function ($rootScope, $controller, _Properties_) {
            scope = $rootScope.$new();
            $controller('PropertiesListController', { $scope: scope });
            Properties = _Properties_;
        }));

        it('should test initialization of nbUsage and modules where property is used', function () {
            const propertiesToMerge = (new Properties(angular.copy(firstPropertiesMock)));
            scope.initModulesWhereUsedAndNbUsageOfProperties(propertiesToMerge);
            expect(propertiesToMerge.key_value_properties.length).toEqual(2);
            expect(propertiesToMerge.key_value_properties[0].modulesWhereUsed).toEqual([ 'Foo' ]);
            expect(propertiesToMerge.key_value_properties[0].nbUsage).toEqual(1);
        });
    });

    // Testing merge properties
    describe('Testing the MergeProperties', function () {
        let scope = null;
        let Properties = null;

        beforeEach(inject(function ($rootScope, $controller, _Properties_) {
            scope = $rootScope.$new();
            $controller('PropertiesListController', { $scope: scope });
            Properties = _Properties_;
        }));

        // tests
        it('should check that all the properties have been merged without duplication key (name)', function () {
            const firstPropertiesToMerge = new Properties(angular.copy(firstPropertiesMock));
            const secondPropertiesToMerge = new Properties(angular.copy(secondPropertiesMock));
            scope.mergeProperties(firstPropertiesToMerge, secondPropertiesToMerge);
            expect(firstPropertiesToMerge.key_value_properties.length).toEqual(4);
            expect(firstPropertiesToMerge.key_value_properties[0].modulesWhereUsed).toEqual([ 'Foo', 'Bar' ]);
            expect(firstPropertiesToMerge.key_value_properties[0].nbUsage).toEqual(2);
        });
    });

    // Testing merge with model
    describe('Testing the properties mergeWithModel method', function () {
        let scope = null;
        let Properties = null;

        beforeEach(inject(function ($rootScope, $controller, _Properties_) {
            scope = $rootScope.$new();
            $controller('PropertiesListController', { $scope: scope });
            Properties = _Properties_;
        }));

        it('should check that all the properties are valued by model properties', function () {
            const propertiesModel = new Properties(angular.copy(firstModelMock));
            const properties = new Properties(angular.copy(firstPropertiesMock));
            properties.mergeWithModel(propertiesModel);
            expect(properties.key_value_properties.length).toEqual(2);
            expect(properties.key_value_properties[0])
                .toEqual(jasmine.objectContaining({ name: 'property_1', value: 'foo',
                    filtrable_value: 'foo', inModel: true, required: false, password: true,
                    defaultValue: 'DEFAULT', pattern: '', tooltip: '[default=DEFAULT]  *password*' }));
            expect(properties.key_value_properties[1])
                .toEqual(jasmine.objectContaining({ name: 'property_2', value: 'bar',
                    filtrable_value: 'bar', inModel: true, required: false, password: false,
                    defaultValue: '45', pattern: '45', tooltip: '[default=45]  [pattern=45] ' }));
        });
    });

    // Testing the merge between properties and global properties
    describe('Testing merge with global properties', function () {
        let scope = null;
        let Properties = null;

        beforeEach(inject(function ($rootScope, $controller, _Properties_) {
            scope = $rootScope.$new();
            $controller('PropertiesListController', { $scope: scope });
            Properties = _Properties_;
        }));

        it('should check that: property is valued by global property', function () {
            const globalProperties = new Properties(angular.copy(globalPropertiesMock));
            const properties = new Properties(angular.copy(thirdPropertiesMock));
            properties.mergeWithGlobalProperties(globalProperties);
            expect(properties.key_value_properties[0])
                .toEqual(jasmine.objectContaining({ name: 'property_1', value: 'foo',
                    valuedByAGlobal: false, filtrable_value: 'foo', globalsUsed: {}, tooltip: '' }));
            expect(properties.key_value_properties[1])
                .toEqual(jasmine.objectContaining({ name: 'property_2', value: 'bar',
                    valuedByAGlobal: true, filtrable_value: 'bar', globalValue: 'global_value',
                    globalsUsed: {}, tooltip: ' [ Valued by a global property with same name: global_value ]' }));
        });
    });
});