/**
 * CUHK iCar Experiment 02
 * 
 * Line Following with AI Vision
 * 
 * The CUHK iCar moves by following a line track by line tracking function
 */
function Move_Forward () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Run, 50)
}
function Turn_Right () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinRight, 50)
}
function Infrared_Sensor_Mode () {
    if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.White) && mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.White)) {
        Move_Forward()
    } else if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.Black) && mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.White)) {
        Turn_Left()
    } else if (mbit_Robot.Line_Sensor(mbit_Robot.enPos.LeftState, mbit_Robot.enLineState.White) && mbit_Robot.Line_Sensor(mbit_Robot.enPos.RightState, mbit_Robot.enLineState.Black)) {
        Turn_Right()
    } else {
        mbit_Robot.CarCtrl(mbit_Robot.CarState.Car_Stop)
    }
}
input.onButtonPressed(Button.B, function () {
    mode = 2
    huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
    basic.showNumber(2)
})
function Line_Following_Mode () {
    huskylens.request()
    if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
        xcenter = huskylens.readeArrow(1, Content2.xTarget)
        if (xcenter < 100) {
            Turn_Left()
        }
        if (xcenter >= 100 && xcenter <= 220) {
            Move_Forward()
        }
        if (xcenter > 220) {
            Turn_Right()
        }
    } else {
        mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_Stop, 0)
    }
}
function Turn_Left () {
    mbit_Robot.CarCtrlSpeed(mbit_Robot.CarState.Car_SpinLeft, 50)
}
input.onButtonPressed(Button.A, function () {
    mode = 1
    huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
    basic.showNumber(1)
})
let xcenter = 0
let mode = 0
mode = 0
huskylens.initI2c()
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    if (mode == 1) {
        Line_Following_Mode()
    }
    if (mode == 2) {
        Infrared_Sensor_Mode()
    }
})
