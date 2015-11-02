/*
A.Cuisinier - v1.1.0

The MIT License (MIT)

Copyright (c) 2015 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function ($) {
    function itializeBuchetteDropDown(element, options) {
        element.append("<span>" + (options.label !== undefined ? options.label : "") + "</span>");

        var container = $("<div class=\"buchette-container\" style=\"display:none;\"></div>")
                            .on("click", function (event) {
                                event.stopPropagation();
                            });

        var search = $("<div class=\"buchette-search\"><input type=\"search\" placeholder=\"Search ...\" /><div>")
                            .on("input", function () {
                                var val = $("input", this).val();
                                var ul = $(this).closest(".buchette-container").find("ul");
                                var lis = $("li", ul);
                                var numClose = 0;
                                lis.show();
                                $(".search-no-result", element).hide();

                                if (val === "") return;

                                val = val.toLowerCase();
                                $.each($("li", ul), function (i, li) {
                                    if ($("span", li).html().toLowerCase().indexOf(val) < 0) {
                                        $(li).hide();
                                        numClose++;
                                    }
                                });

                                if (numClose === lis.length)
                                    $(".search-no-result", element).show();
                            });

        container.append(search);


        function updateSelectedItems() {
            if (element.data().selectedItemCount === 0) {
                $("span.count", element).remove();
                return;
            }
            if ($("span.count", element).length === 0) {
                element.append("<span class=\"count\">" + element.data().selectedItemCount + " selected item(s)</span>");
                return;
            }
            $("span.count", element).html(element.data().selectedItemCount + " selected item(s)");
        };

        var count = options.count === undefined || options.count == null ? false : options.count;

        // loads data
        var ul = $("<ul>");
        var loadToArea = [];

        if (options.area !== undefined && options.area != null) {
            element.data().removeCallback = function (item) {
                $.each($("li", ul), function (i, li) {
                    var d = $(li).data().dropdown.data;
                    if (d !== item.data) return true;
                    d.checked = false;
                    $("input[type=checkbox]", li).prop("checked", false);
                    if (count) {
                        element.data().selectedItemCount--;
                        updateSelectedItems();
                    }
                    return false;
                });
            };
        }

        if (options.data != undefined && options.data != null && options.data.length > 0) {
            $.each(options.data, function (i, item) {
                var checkbox = $("<input type=\"checkbox\" />")
                                .prop("checked", item.checked)
                                .on("change", function () {
                                    var cb = $(this);
                                    var itemData = cb.closest("li").data().dropdown;
                                    itemData.checked = cb.is(":checked");

                                    if (options.area === undefined || options.area == null) return;

                                    if (cb.is(":checked")) {
                                        $("#" + options.area).data().addBuchette([{
                                            label: item.label,
                                            ref: item,
                                            callback: element.data().removeCallback
                                        }]);
                                    } else {
                                        console.info("li config", item);
                                        console.info("element.data()", element.data());
                                        item.buchette.remove();
                                    }
                                    if (count) {
                                        element.data().selectedItemCount += cb.is(":checked") ? 1 : -1;
                                        updateSelectedItems();
                                    }
                                });

                var content = $("<label><span>" + item.label + "</span></label>").prepend(checkbox);
                var li = $("<li>").append(content).data("dropdown", item);

                ul.append(li);

                if (item.checked) {
                    loadToArea.push({
                        label: item.label,
                        ref: item,
                        callback: element.data().removeCallback
                    });
                }
            });
        }

        if (count) {
            element.data().selectedItemCount = loadToArea.length;
            updateSelectedItems();
        }
        container.append(ul);

        container.append("<div class=\"search-no-result\" style=\"display:none;\">No result</div>");

        element
            .addClass("buchette-dropdown")
            .append("<i class=\"buchette fa fa-sort-asc\"></i>")
            .append(container)
            .on("click", function (event) {
                event.stopPropagation();
                $("i.buchette", this).toggleClass("fa-sort-asc fa-sort-desc");
                var container = $(".buchette-container", this);

                if (!container.is(":visible")) {
                    container.width(element.width());
                    $(window).trigger("buchette.closeAll");
                    container.show();
                } else {
                    container.hide();
                }
            });

        function tryCloseCurrent() {
            if (!container.is(":visible")) return;
            container.hide();
            $("i.buchette", element).toggleClass("fa-sort-asc fa-sort-desc");
        };

        $(window)
            .on("click", tryCloseCurrent)
            .on("buchette.closeAll", tryCloseCurrent);

        // loads checked items into area
        if (options.area === undefined || options.area == null) return;
        if (loadToArea.length > 0) {
            $("#" + options.area).data().addBuchette(loadToArea);
        }
    };

    function itializeBuchetteArea(element) {
        element.addClass("buchette-area");

        element.data().addBuchette = function (items) {
            $.each(items, function (i, item) {
                var buchette = $("<li>" + item.label + "<a href=\"#\"><i class=\"fa fa-remove\"></i></a></li>")
                    .on("click", "a", function () {
                        item.callback(item.ref);
                        $(this).parent().remove();
                    });

                element.append(buchette);
                item.ref.buchette = buchette;
            });
        };
    };

    $.fn.buchette = function (options) {
        if (options === undefined || options == null
         || options.type === undefined || options.type == null) {
            $.error("Invalid usage");
            return;
        }

        switch (options.type) {
            case "dropdown":
                itializeBuchetteDropDown($(this), options);
                break;
            case "area":
                itializeBuchetteArea($(this));
                break;
            default:
                $.error("Invalid buchette option type \"" + options.type + "\"");
        }
    };
})(jQuery);