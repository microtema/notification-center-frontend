var MessageNotificationStore = function () {

    this.entries = [];
    this.restUrl = endpoint['localhost'];

    dispatcher.register(function (payload) {
        console.info('on event: ', payload.type);

        switch (payload.type) {
            case 'check.all' :
                this.checkAllEntries(payload);
                break;
            case 'check' :
                this.checkEntry(payload);
                break;
            case 'mark' :
                this.markEntry(payload);
                break;
            case 'mark.checked' :
                this.markCheckedEntries();
                break;
            case 'delete' :
                this.deleteEntry(payload);
                break;
            case 'delete.checked' :
                this.deleteCheckedEntries();
                break;
            case 'request.all' :
                this.request();
                break;
            case 'update.unreaded.count' :
                this.updateUnreadedCount();
                break;
        }
    }.bind(this));

    this._notify = function () {
        console.info('notify: ', this.entries);

        emitter.emit('changed', this.entries);

        emitter.emit('unread.count', _.filter(this.entries, function (data) {
            return data.type == 'UNREAD'
        }).length);
    };

    this.checkEntry = function (payload) {

        _.find(this.entries, {id: payload.data.id}).checked = payload.data.checked;

        this._notify();
    };

    this.deleteEntry = function (payload) {
        console.info('deleteEntry: ', payload.data);

        $.ajax({
            url: this.restUrl['/rest/message'](payload.data.id),
            type: 'DELETE',
            success: function (data) {
                this.entries = _.without(this.entries, payload.data);
                this._notify();
            }.bind(this)
        });
    };

    this.deleteCheckedEntries = function () {

        var checkedEntries = _.filter(this.entries, function (data) {
            return data.checked === true
        });

        var entriesIds = _.map(checkedEntries, function (data) {
            return data.id
        });

        console.info('deleteCheckedEntries', entriesIds);

        $.ajax({
            url: this.restUrl['/rest/message'](entriesIds.join(',')),
            type: 'DELETE',
            success: function (data) {

                for (var index = 0; index < checkedEntries.length; index++) {
                    this.entries = _.without(this.entries, checkedEntries[index]);
                }

                this._notify();

            }.bind(this)
        });
    };

    this.checkAllEntries = function (payload) {
        console.info('checkAllEntries: ', payload.data);

        _.each(this.entries, function (data) {
            data.checked = payload.data;
        });

        this._notify();
    };

    this.markEntry = function (payload) {

        this._markCheckedEntries([payload.data]);
    };

    this.markCheckedEntries = function () {

        this._markCheckedEntries(_.filter(this.entries, function (data) {
            return data.checked === true
        }));
    };

    this._markCheckedEntries = function (checkedEntries) {

        var entriesIds = _.map(checkedEntries, function (data) {
            return data.id
        });

        console.info('markCheckedEntries', entriesIds);

        $.ajax({
            url: this.restUrl['/rest/message'](entriesIds.join(',')),
            type: 'POST',
            success: function (data) {

                for (var index = 0; index < checkedEntries.length; index++) {
                    _.find(this.entries, checkedEntries[index]).type = 'READ';
                }

                this._notify();

            }.bind(this)
        });

    };

    this.request = function () {
        $.get(this.restUrl['/rest/message'](), function (entries) {
            this.entries = entries;
            this._notify();
        }.bind(this));
    };

    this.updateUnreadedCount = function () {
        $.get(this.restUrl['/rest/message/type']('UNREAD'), function (entries) {
            emitter.emit('unread.count', entries.length);
        }.bind(this));
    }

};