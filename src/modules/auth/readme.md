在这里，我们创建了validateUser 方法来检查来自user.model 的用户是否与数据库中的用户记录匹配。如果没有匹配，该方法返回一个null 的值。
我们还创建了login 方法，该方法使用jwtService.sign 方法为从我们的validate 中返回的用户生成一个JWT访问令牌LocalStrategy 。
