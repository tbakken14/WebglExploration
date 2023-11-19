class Profile {
    static lives = 3;
    static money = 0;
    static speed = 1;
    static reload = 5;
    static ammo = 1;
    static upgradeAmmoCost = 100;
    static upgradeReloadCost = 100;
    static upgradeSpeedCost = 100;
    static extraLifeCost = 100;

    static validateFunds(cost) {
        return Profile.money >= cost;
    }

    static buyLife() {
        cost = Profile.extraLifeCost;
        if (Profile.validateFunds(cost)) {
            Profile.money -= cost;
            Profile.extraLifeCost += 100;
            Profile.lives += 1;
        }
    }

    static updradeAmmo() {
        cost = Profile.upgradeAmmoCost;
        if (Profile.validateFunds(cost)) {
            Profile.money -= cost;
            Profile.upgradeAmmoCost += 100;
            Profile.ammo += 1;
        }
    }

    static upgradeReload() {
        cost = Profile.upgradeReloadCost;
        if (Profile.validateFunds(cost)) {
            Profile.money -= cost;
            Profile.upgradeReloadCost += 100;
            Profile.reload *= .95;
        }
    }

    static upgradeSpeed() {
        cost = Profile.upgradeSpeedCost;
        if (Profile.validateFunds(Profile.upgradeSpeedCost)) {
            Profile.money -= cost;
            Profile.upgradeSpeedCost += 100;
            Profile.speed *= 1.05
        }
    }

    static resetStats() {
        Profile.lives = 3;
        Profile.money = 0;
        Profile.speed = 1;
        Profile.reload = 5;
        Profile.ammo = 1;
        Profile.upgradeAmmoCost = 100;
        Profile.upgradeReloadCost = 100;
        Profile.upgradeSpeedCost = 100;
        Profile.extraLifeCost = 100;
    }
}

export default Profile;