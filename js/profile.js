class Profile {
    static lives = 3;
    static money = 100;
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
        if (Profile.validateFunds(Profile.extraLifeCost)) {
            Profile.money -= Profile.extraLifeCost;
            Profile.extraLifeCost += 100;
            Profile.lives += 1;
        }
    }

    static upgradeAmmo() {
        if (Profile.validateFunds(Profile.upgradeAmmoCost)) {
            Profile.money -= Profile.upgradeAmmoCost;
            Profile.upgradeAmmoCost += 100;
            Profile.ammo += 1;
        }
    }

    static upgradeReload() {
        if (Profile.validateFunds(Profile.upgradeReloadCost)) {
            Profile.money -= Profile.upgradeReloadCost;
            Profile.upgradeReloadCost += 100;
            Profile.reload *= .95;
        }
    }

    static upgradeSpeed() {
        if (Profile.validateFunds(Profile.upgradeSpeedCost)) {
            Profile.money -= Profile.upgradeSpeedCost;
            Profile.upgradeSpeedCost += 100;
            Profile.speed *= 1.05;
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