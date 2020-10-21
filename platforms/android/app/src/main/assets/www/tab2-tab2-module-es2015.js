(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"],{

/***/ "./node_modules/agm-direction/fesm2015/agm-direction.js":
/*!**************************************************************!*\
  !*** ./node_modules/agm-direction/fesm2015/agm-direction.js ***!
  \**************************************************************/
/*! exports provided: AgmDirectionModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgmDirectionModule", function() { return AgmDirectionModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return AgmDirection; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/fesm2015/agm-core.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AgmDirection {
    /**
     * @param {?} gmapsApi
     */
    constructor(gmapsApi) {
        this.gmapsApi = gmapsApi;
        // Options
        this.travelMode = 'DRIVING';
        this.transitOptions = undefined;
        this.drivingOptions = undefined;
        this.waypoints = [];
        this.optimizeWaypoints = true;
        this.provideRouteAlternatives = false;
        this.avoidHighways = false;
        this.avoidTolls = false;
        // Remove or draw direction
        this.visible = true;
        // Direction change event handler
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Direction response for the new request
        this.onResponse = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Send a custom infowindow
        this.sendInfoWindow = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Status of Directions Query (google.maps.DirectionsStatus.OVER_QUERY_LIMIT)
        this.status = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        // Marker drag event handler
        this.originDrag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.destinationDrag = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.directionsService = undefined;
        this.directionsDisplay = undefined;
        this.waypointsMarker = [];
        // Use for visible flag
        this.isFirstChange = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.visible === true) {
            this.directionDraw();
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    ngOnChanges(obj) {
        /**
         * When visible is false then remove the direction layer
         */
        if (!this.visible) {
            try {
                this.removeMarkers();
                this.removeDirections();
            }
            catch (e) { }
        }
        else {
            if (this.isFirstChange) {
                /**
                 * When visible is false at the first time
                 */
                if (typeof this.directionsDisplay === 'undefined') {
                    this.directionDraw();
                }
                this.isFirstChange = false;
                return;
            }
            /**
             * When renderOptions are not first change then reset the display
             */
            if (typeof obj.renderOptions !== 'undefined') {
                if (obj.renderOptions.firstChange === false) {
                    this.removeMarkers();
                    this.removeDirections();
                }
            }
            this.directionDraw();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyMarkers();
        this.removeDirections();
    }
    /**
     * This event is fired when the user creating or updating this direction
     * @return {?}
     */
    directionDraw() {
        this.gmapsApi.getNativeMap().then((map) => {
            if (typeof this.directionsDisplay === 'undefined') {
                this.directionsDisplay = new google.maps.DirectionsRenderer(this.renderOptions);
                this.directionsDisplay.setMap(map);
                this.directionsDisplay.addListener('directions_changed', () => {
                    this.onChange.emit(this.directionsDisplay.getDirections());
                });
            }
            if (typeof this.directionsService === 'undefined') {
                this.directionsService = new google.maps.DirectionsService;
            }
            if (typeof this.panel === 'undefined') {
                this.directionsDisplay.setPanel(null);
            }
            else {
                this.directionsDisplay.setPanel(this.panel);
            }
            // Render exist direction
            if (typeof this.renderRoute === 'object' && this.renderRoute !== null) {
                this.directionsDisplay.setDirections(this.renderRoute);
                this.renderRoute = null; // or set undefined, ''
            }
            else {
                // Request new direction
                this.directionsService.route({
                    origin: this.origin,
                    destination: this.destination,
                    travelMode: this.travelMode,
                    transitOptions: this.transitOptions,
                    drivingOptions: this.drivingOptions,
                    waypoints: this.waypoints,
                    optimizeWaypoints: this.optimizeWaypoints,
                    provideRouteAlternatives: this.provideRouteAlternatives,
                    avoidHighways: this.avoidHighways,
                    avoidTolls: this.avoidTolls,
                }, (response, status) => {
                    this.onResponse.emit(response);
                    // Emit Query Status
                    this.status.emit(status);
                    /**
                     * DirectionsStatus
                     * https://developers.google.com/maps/documentation/javascript/directions#DirectionsStatus
                     */
                    switch (status) {
                        case 'OK':
                            this.directionsDisplay.setDirections(response);
                            /**
                             * Emit The DirectionsResult Object
                             * https://developers.google.com/maps/documentation/javascript/directions?hl=en#DirectionsResults
                             */
                            // Custom Markers
                            if (typeof this.markerOptions !== 'undefined') {
                                this.destroyMarkers();
                                // Set custom markers
                                /** @type {?} */
                                const _route = response.routes[0].legs[0];
                                try {
                                    // Origin Marker
                                    if (typeof this.markerOptions.origin !== 'undefined') {
                                        this.markerOptions.origin.map = map;
                                        this.markerOptions.origin.position = _route.start_location;
                                        this.originMarker = this.setMarker(map, this.originMarker, this.markerOptions.origin, _route.start_address);
                                        if (this.markerOptions.origin.draggable) {
                                            this.originMarker.addListener('dragend', () => {
                                                this.origin = this.originMarker.position;
                                                this.directionDraw();
                                                this.originDrag.emit(this.origin);
                                            });
                                        }
                                    }
                                    // Destination Marker
                                    if (typeof this.markerOptions.destination !== 'undefined') {
                                        this.markerOptions.destination.map = map;
                                        this.markerOptions.destination.position = _route.end_location;
                                        this.destinationMarker = this.setMarker(map, this.destinationMarker, this.markerOptions.destination, _route.end_address);
                                        if (this.markerOptions.destination.draggable) {
                                            this.destinationMarker.addListener('dragend', () => {
                                                this.destination = this.destinationMarker.position;
                                                this.directionDraw();
                                                this.destinationDrag.emit(this.destination);
                                            });
                                        }
                                    }
                                    // Waypoints Marker
                                    if (typeof this.markerOptions.waypoints !== 'undefined') {
                                        this.waypoints.forEach((waypoint, index) => {
                                            // If waypoints are not array then set all the same
                                            if (!Array.isArray(this.markerOptions.waypoints)) {
                                                this.markerOptions.waypoints.map = map;
                                                this.markerOptions.waypoints.position = _route.via_waypoints[index];
                                                this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints, _route.via_waypoints[index]));
                                            }
                                            else {
                                                this.markerOptions.waypoints[index].map = map;
                                                this.markerOptions.waypoints[index].position = _route.via_waypoints[index];
                                                this.waypointsMarker.push(this.setMarker(map, waypoint, this.markerOptions.waypoints[index], _route.via_waypoints[index]));
                                            }
                                        }); // End forEach
                                    }
                                }
                                catch (err) {
                                    console.error('MarkerOptions error.', err);
                                }
                            }
                            break;
                        default:
                            // console.warn(status);
                            break;
                    } // End switch
                });
            }
        });
    }
    /**
     * Custom Origin and Destination Icon
     * \@memberof AgmDirection
     * @param {?} map map
     * @param {?} marker marker
     * @param {?} markerOpts properties
     * @param {?} content marker's infowindow content
     * @return {?} new marker
     */
    setMarker(map, marker, markerOpts, content) {
        if (typeof this.infoWindow === 'undefined') {
            this.infoWindow = new google.maps.InfoWindow({});
            this.sendInfoWindow.emit(this.infoWindow);
        }
        marker = new google.maps.Marker(markerOpts);
        // https://developers.google.com/maps/documentation/javascript/reference/marker?hl=zh-tw#MarkerOptions.clickable
        if (marker.clickable) {
            marker.addListener('click', () => {
                /** @type {?} */
                const infowindoContent = typeof markerOpts.infoWindow === 'undefined' ? content : markerOpts.infoWindow;
                this.infoWindow.setContent(infowindoContent);
                this.infoWindow.open(map, marker);
            });
        }
        return marker;
    }
    /**
     * This event is fired when remove markers
     * @return {?}
     */
    removeMarkers() {
        if (typeof this.originMarker !== 'undefined') {
            this.originMarker.setMap(null);
        }
        if (typeof this.destinationMarker !== 'undefined') {
            this.destinationMarker.setMap(null);
        }
        this.waypointsMarker.forEach((w) => {
            if (typeof w !== 'undefined') {
                w.setMap(null);
            }
        });
    }
    /**
     * This event is fired when remove directions
     * @return {?}
     */
    removeDirections() {
        if (this.directionsDisplay !== undefined) {
            this.directionsDisplay.setPanel(null);
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = undefined;
        }
    }
    /**
     * This event is fired when destroy markers
     * @return {?}
     */
    destroyMarkers() {
        // Remove origin markers
        try {
            if (typeof this.originMarker !== 'undefined') {
                google.maps.event.clearListeners(this.originMarker, 'click');
                if (this.markerOptions.origin.draggable) {
                    google.maps.event.clearListeners(this.originMarker, 'dragend');
                }
            }
            if (typeof this.destinationMarker !== 'undefined') {
                google.maps.event.clearListeners(this.destinationMarker, 'click');
                if (this.markerOptions.origin.draggable) {
                    google.maps.event.clearListeners(this.destinationMarker, 'dragend');
                }
            }
            this.waypointsMarker.forEach((w) => {
                if (typeof w !== 'undefined') {
                    google.maps.event.clearListeners(w, 'click');
                }
            });
            this.removeMarkers();
        }
        catch (err) {
            console.error('Can not reset custom marker.', err);
        }
    }
}
AgmDirection.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                selector: 'agm-direction',
            },] }
];
/** @nocollapse */
AgmDirection.ctorParameters = () => [
    { type: _agm_core__WEBPACK_IMPORTED_MODULE_1__["GoogleMapsAPIWrapper"] }
];
AgmDirection.propDecorators = {
    origin: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    destination: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    travelMode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    transitOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    drivingOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    waypoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    optimizeWaypoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    provideRouteAlternatives: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    avoidHighways: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    avoidTolls: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    renderOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    panel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    markerOptions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    infoWindow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    visible: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    renderRoute: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    onChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    onResponse: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    sendInfoWindow: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    status: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    originDrag: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
    destinationDrag: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AgmDirectionModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AgmDirectionModule,
        };
    }
}
AgmDirectionModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                imports: [],
                declarations: [
                    AgmDirection,
                ],
                exports: [
                    AgmDirection,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=agm-direction.js.map


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/tab2/tab2.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/tab2/tab2.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Tab Two\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-item>\n        <agm-map [latitude]=\"origin.lat\" [longitude]=\"origin.lng\">\n            <agm-direction [origin]=\"origin\" [destination]=\"destination\">\n            </agm-direction>\n          </agm-map>\n    </ion-item>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/tab2/tab2.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.module.ts ***!
  \*************************************/
/*! exports provided: Tab2PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function() { return Tab2PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab2.page */ "./src/app/tab2/tab2.page.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/fesm2015/agm-core.js");
/* harmony import */ var agm_direction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! agm-direction */ "./node_modules/agm-direction/fesm2015/agm-direction.js");









let Tab2PageModule = class Tab2PageModule {
};
Tab2PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"] }]),
            _agm_core__WEBPACK_IMPORTED_MODULE_7__["AgmCoreModule"].forRoot({
                apiKey: 'AIzaSyBYSwbBQGZZLGvYH7MfbR7fXz_f5wAlLOQ'
            }),
            agm_direction__WEBPACK_IMPORTED_MODULE_8__["AgmDirectionModule"]
        ],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"]]
    })
], Tab2PageModule);



/***/ }),

/***/ "./src/app/tab2/tab2.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RhYjIvdGFiMi5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/tab2/tab2.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab2/tab2.page.ts ***!
  \***********************************/
/*! exports provided: Tab2Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2Page", function() { return Tab2Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auxiliar_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auxiliar.service */ "./src/app/services/auxiliar.service.ts");
/* harmony import */ var _models_coords__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/coords */ "./src/app/models/coords.ts");




let Tab2Page = class Tab2Page {
    constructor(aux) {
        this.aux = aux;
        this.origin = new _models_coords__WEBPACK_IMPORTED_MODULE_3__["Coords"]();
        this.destination = new _models_coords__WEBPACK_IMPORTED_MODULE_3__["Coords"]();
    }
    ionViewDidEnter() {
        let indications = this.aux.getParams("indicaciones");
        if (indications) {
            this.origin = indications.origin;
            this.destination = indications.destination;
            console.table(indications);
        }
    }
    ionViewWillLeave() {
        this.origin = new _models_coords__WEBPACK_IMPORTED_MODULE_3__["Coords"]();
        this.destination = new _models_coords__WEBPACK_IMPORTED_MODULE_3__["Coords"]();
        console.log("adios");
    }
};
Tab2Page.ctorParameters = () => [
    { type: _services_auxiliar_service__WEBPACK_IMPORTED_MODULE_2__["AuxiliarService"] }
];
Tab2Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab2',
        template: __webpack_require__(/*! raw-loader!./tab2.page.html */ "./node_modules/raw-loader/index.js!./src/app/tab2/tab2.page.html"),
        styles: [__webpack_require__(/*! ./tab2.page.scss */ "./src/app/tab2/tab2.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_auxiliar_service__WEBPACK_IMPORTED_MODULE_2__["AuxiliarService"]])
], Tab2Page);



/***/ })

}]);
//# sourceMappingURL=tab2-tab2-module-es2015.js.map