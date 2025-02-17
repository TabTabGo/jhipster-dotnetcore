/* eslint-disable consistent-return */
const EntityClientGenerator = require('generator-jhipster/generators/entity-client');
const constants = require('../generator-dotnetcore-constants');
const customizeDotnetPaths = require('../utils').customizeDotnetPaths;
const writeBlazorFiles = require('./files-blazor').writeFiles;
const writeXamarinFiles = require('./files-xamarin').writeFiles;
const writeReactFiles = require('./files-react').writeFiles;
const baseConstants = require('generator-jhipster/generators/generator-constants');

const { REACT } = baseConstants.SUPPORTED_CLIENT_FRAMEWORKS;
const BLAZOR = constants.BLAZOR;
const XAMARIN = constants.XAMARIN;

module.exports = class extends EntityClientGenerator {
    constructor(args, opts) {
        super(args, { fromBlueprint: true, ...opts }); // fromBlueprint variable is important

        if (this.jhipsterConfig.baseName) {
            this.baseName = this.jhipsterConfig.baseName;
            this.clientFramework = this.jhipsterConfig.clientFramework;
        }
    }

    get configuring() {
        return {
            ...super._configuring(),
            viewModelWorkaround() {
                // only work with relation id rather than complete json
                this.viewModel = 'yes';
            },
        };
    }

    get composing() {
        return super._composing();
    }

    get loading() {
        return super._loading();
    }

    get preparing() {
        return super._preparing();
    }

    get default() {
        return {
            ...super._default(),
            customizeDotnetPaths,
        };
    }

    get writing() {
        if (this.clientFramework === BLAZOR) {
            return {
                writeFilesDotnetcore() {
                    if (this.skipClient) return;
                    return writeBlazorFiles.call(this);
                },
            };
        }
        if (this.clientFramework === XAMARIN) {
            return {
                writeFilesDotnetcore() {
                    if (this.skipClient) return;
                    return writeXamarinFiles.call(this);
                },
            };
        }

        if (this.clientFramework === REACT) {
            return {
                writeFilesDotnetcore() {
                    if (this.skipClient) return;
                    return writeReactFiles.call(this);
                },
            };
        }
        return super._writing();
    }

    get postWriting() {
        return super._postWriting();
    }
};
