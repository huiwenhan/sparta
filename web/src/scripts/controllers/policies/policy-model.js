(function () {
  'use strict';

  /*POLICY MODEL CONTROLLER*/
  angular
    .module('webApp')
    .controller('PolicyModelCtrl', PolicyModelCtrl);

  PolicyModelCtrl.$inject = ['ModelFactory', 'PolicyModelFactory', 'ModelService'];

  function PolicyModelCtrl(ModelFactory, PolicyModelFactory, ModelService) {
    var vm = this;

    vm.init = init;
    vm.changeDefaultConfiguration = changeDefaultConfiguration;
    vm.addModel = addModel;
    vm.removeModel = removeModel;
    vm.isLastModel = ModelService.isLastModel;
    vm.isNewModel = ModelService.isNewModel;

    vm.init();

    function init() {
      vm.template = PolicyModelFactory.getTemplate();
      vm.model = ModelFactory.getModel(vm.template);
      vm.modelError = '';
      if (vm.model) {
        vm.policy = PolicyModelFactory.getCurrentPolicy();
        vm.modelError = ModelFactory.getError();
        vm.modelContext = ModelFactory.getContext();

        vm.modelTypes = vm.template.types;
        vm.configPlaceholder = vm.template.configPlaceholder;
        vm.outputPattern = vm.template.outputPattern;
        vm.outputInputPlaceholder = vm.template.outputInputPlaceholder;
      }
    }

    function changeDefaultConfiguration() {
      vm.model.configuration = getDefaultConfigurations(vm.model.type);
    }

    function getDefaultConfigurations(type) {
      var types = vm.template.types;
      switch (type) {
        case types[0].name:
        {
          return vm.template.morphlinesDefaultConfiguration;
        }
        case types[1].name:
        {
          return vm.template.dateTimeDefaultConfiguration;
        }
        case types[2].name:
        {
          return vm.template.typeDefaultConfiguration;
        }
      }
    }

    function addModel() {
      if (vm.form.$valid) {
        ModelService.addModel();
      } else {
        ModelFactory.setError("_GENERIC_FORM_ERROR_");
      }
    }

    function removeModel() {
      ModelService.removeModel().then(function () {
        vm.model = ModelFactory.resetModel(vm.template);
      });
    }
  }
})
();
