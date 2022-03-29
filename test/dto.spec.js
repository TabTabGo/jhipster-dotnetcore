const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const constants = require('../generators/generator-dotnetcore-constants');

const SERVER_MAIN_SRC_DIR = `${constants.SERVER_SRC_DIR}`;

// initial precondition for all tests
function getPreCondition() {
    return helpers
        .run('generator-jhipster/generators/entity')
        .inTmpDir(dir => {
            console.log(`Test temp dir: ${dir}`);
            fse.copySync(path.join(__dirname, '../test/templates/ngx-blueprint'), dir);
            fse.copySync(path.join(__dirname, '../test/templates/viewModel'), dir);
        })
        .withOptions({
            'from-cli': true,
            skipInstall: true,
            blueprints: 'dotnetcore',
            skipChecks: true,
            regenerate: true,
            force: true,
        })
        .withGenerators([
            [
                require('../generators/entity/index.js'), // eslint-disable-line global-require
                'jhipster-dotnetcore:entity',
                path.join(__dirname, '../generators/entity/index.js'),
            ],
            [
                require('../generators/entity-server/index.js'), // eslint-disable-line global-require
                'jhipster-dotnetcore:entity-server',
                path.join(__dirname, '../generators/entity-server/index.js'),
            ],
        ]);
}

describe('testing viewModel', () => {
    context('generating viewModel', () => {
        const personClass = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.Domain/Entities/Person.cs`;
        const personViewModel = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint.ViewModel/PersonViewModel.cs`;
        const viewModelMappingFile = `${SERVER_MAIN_SRC_DIR}JhipsterBlueprint/Configuration/AutoMapper/AutoMapperProfile.cs`;

        before(done => {
            getPreCondition()
                .withArguments(['Person'])
                .withPrompts({
                    fieldAdd: false,
                    relationshipAdd: false,
                    viewModel: 'mapstruct',
                    service: 'serviceImpl',
                    pagination: 'no',
                })
                .on('end', done);
        });

        it('check if required files for viewModel are copied', () => {
            assert.file('.jhipster/Person.json');
            assert.file('.yo-rc.json');
        });

        it('checks viewModel files', () => {
            assert.file(personClass);
            assert.file(personViewModel);
            assert.file(viewModelMappingFile);
            assert.fileContent(personViewModel, /public class PersonViewModel/);
            assert.fileContent(viewModelMappingFile, /public class AutoMapperProfile : Profile/);
        });
    });
});
