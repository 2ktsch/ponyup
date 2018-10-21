/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

Vue.use(VueMaterial.default)

const app = new Vue({
    el:'#app',
    data:{
        ready:false,
        title: "PonyUp!",
        status:false,
        menuVisible: true,
        showDialog: true,
        apps: [
            {name: "Candy Crush",
                daily_limit_minutes: 30},
            {name: "Facebook",
                daily_limit_minutes: 45,},
            {name: "Instagram",
                daily_limit_minutes: 15,}
        ]
    },
    methods:{
        init:function() {
            this.ready = true;
        },
        toggleMenu:function() {
            this.menuVisible != this.menuVisible;
        },
        donate: function(usage,config,global_config,stats) {

            var donate_today = 0;

            for(var i=0; i < usage.length; i++)
            {
                var app_usage = usage[i];

                if ( stats.donated_this_month < global_config.monthly_limit)
                {
                    var minutes_yesterday = app_usage.minutes_yesterday;
                    var daily_limit = (config.filter(x => x.name == app_usage.name)[0]).daily_limit_minutes

                    if ( minutes_yesterday > daily_limit)
                    {
                        donate_today += (minutes_yesterday - daily_limit) / 100;
                    }
                }
            }

            if (stats.donated_this_month + donate_today > global_config.monthly_limit)
            {
                donate_today = global_config.monthly_limit - stats.donated_this_month;
            }

            return donate_today;
        }
    }


})

document.addEventListener('deviceready', app.init);
